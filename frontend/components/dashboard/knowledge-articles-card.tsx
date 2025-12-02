"use client"

import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Sample data for frequently referenced knowledgebase articles
const articlesData = [
  { title: "How to Reset Password", count: 42 },
  { title: "Billing Payment Methods", count: 31 },
  { title: "Account Verification", count: 24 },
  { title: "Subscription Plans", count: 19 },
  { title: "Device Compatibility", count: 14 },
]

// Colors for the pie chart segments - dark blue palette
const COLORS = ["#0C4A6E", "#0369A1", "#0284C7", "#38BDF8", "#7DD3FC"]

const chartConfig = {
  articles: {
    label: "Articles",
    color: "#0C4A6E",
  },
} satisfies ChartConfig

interface KnowledgeArticlesCardProps {
  data?: Array<{ title: string; count: number }>
}

export function KnowledgeArticlesCard({
  data = articlesData,
}: KnowledgeArticlesCardProps) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <div className="rounded-xl bg-[#171717] p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-1">Knowledge Articles</h3>
        <p className="text-xs text-zinc-400">
          Distribution of the most frequently referenced articles.
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
                nameKey="title"
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
                      const data = payload?.[0]?.payload as { title: string; count: number } | undefined
                      return data?.title || value || ""
                    }}
                    formatter={(value) => {
                      const count = typeof value === "number" ? value : 0
                      const percentage = total > 0 ? Math.round((count / total) * 100) : 0
                      return `${count} references (${percentage}%)`
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
                  <span className="text-xs font-medium text-zinc-300">{item.title}</span>
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

