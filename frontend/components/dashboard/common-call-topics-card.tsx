"use client"

import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Sample data for common call topics
const topicsData = [
  { topic: "Billing Issues", count: 35 },
  { topic: "Technical Support", count: 28 },
  { topic: "Account Access", count: 18 },
  { topic: "Product Information", count: 12 },
  { topic: "Returns & Refunds", count: 7 },
]

// Colors for the pie chart segments
const COLORS = ["#542CDE", "#7454E0", "#9480E7", "#B4ACEF", "#D3D0F5"]

const chartConfig = {
  topics: {
    label: "Topics",
    color: "#542CDE",
  },
} satisfies ChartConfig

interface CommonCallTopicsCardProps {
  data?: Array<{ topic: string; count: number }>
}

export function CommonCallTopicsCard({
  data = topicsData,
}: CommonCallTopicsCardProps) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <div className="rounded-xl bg-[#171717] p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-1">Common Call Topics</h3>
        <p className="text-xs text-zinc-400">
          Distribution of the most frequent conversation topics.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="flex items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className="h-[200px] w-[200px]"
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
                nameKey="topic"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value, payload) => {
                      // For pie charts, payload is an array with the data
                      const data = payload?.[0]?.payload as { topic: string; count: number } | undefined
                      return data?.topic || value || ""
                    }}
                    formatter={(value) => {
                      const count = typeof value === "number" ? value : 0
                      const percentage = total > 0 ? Math.round((count / total) * 100) : 0
                      return `${count} calls (${percentage}%)`
                    }}
                  />
                }
              />
            </PieChart>
          </ChartContainer>
        </div>
        
        {/* Legend and Stats */}
        <div className="flex flex-col justify-center space-y-4">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0
            return (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-xs font-medium text-zinc-300">{item.topic}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-zinc-50">{item.count}</span>
                    <span className="text-xs text-zinc-500">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

