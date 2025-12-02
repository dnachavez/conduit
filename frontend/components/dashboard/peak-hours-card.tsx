"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

// Data representing peak hours (calls by hour of day)
const peakHoursData = [
  { hour: "00:00", calls: 12 },
  { hour: "01:00", calls: 8 },
  { hour: "02:00", calls: 5 },
  { hour: "03:00", calls: 3 },
  { hour: "04:00", calls: 2 },
  { hour: "05:00", calls: 4 },
  { hour: "06:00", calls: 7 },
  { hour: "07:00", calls: 15 },
  { hour: "08:00", calls: 32 },
  { hour: "09:00", calls: 56 },
  { hour: "10:00", calls: 78 },
  { hour: "11:00", calls: 95 },
  { hour: "12:00", calls: 102 },
  { hour: "13:00", calls: 120 },
  { hour: "14:00", calls: 118 },
  { hour: "15:00", calls: 110 },
  { hour: "16:00", calls: 95 },
  { hour: "17:00", calls: 82 },
  { hour: "18:00", calls: 68 },
  { hour: "19:00", calls: 55 },
  { hour: "20:00", calls: 40 },
  { hour: "21:00", calls: 28 },
  { hour: "22:00", calls: 20 },
  { hour: "23:00", calls: 15 },
]

const chartConfig = {
  calls: {
    label: "Calls",
    color: "#542CDE",
  },
} satisfies ChartConfig

export function PeakHoursCard() {
  const isMobile = useIsMobile()
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<"daily" | "weekly" | "monthly">("daily")

  // Placeholder until timeframe-specific filtering is wired up
  const filteredData = peakHoursData

  return (
    <div className="rounded-xl bg-[#171717] p-6">
      <div className="relative flex items-start justify-between mb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold mb-1">Peak Hours</h3>
          <p className="text-xs text-zinc-400">
            Busiest times of day based on call volume.
          </p>
        </div>
        <div className="absolute right-0 top-0">
          <ToggleGroup
            type="single"
            value={selectedTimeframe}
            onValueChange={(value) => value && setSelectedTimeframe(value as "daily" | "weekly" | "monthly")}
            className="hidden sm:flex rounded-lg bg-[#1f1f1f] border border-zinc-800 p-1"
          >
            <ToggleGroupItem 
              value="daily" 
              className="h-8 rounded-md bg-transparent px-3 text-xs font-medium text-zinc-400 transition-all hover:bg-transparent hover:text-zinc-50 data-[state=on]:bg-[#2a2a2a] data-[state=on]:text-zinc-50"
            >
              Daily
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="weekly" 
              className="h-8 rounded-md bg-transparent px-3 text-xs font-medium text-zinc-400 transition-all hover:bg-transparent hover:text-zinc-50 data-[state=on]:bg-[#2a2a2a] data-[state=on]:text-zinc-50"
            >
              Weekly
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="monthly" 
              className="h-8 rounded-md bg-transparent px-3 text-xs font-medium text-zinc-400 transition-all hover:bg-transparent hover:text-zinc-50 data-[state=on]:bg-[#2a2a2a] data-[state=on]:text-zinc-50"
            >
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
          <Select 
            value={selectedTimeframe} 
            onValueChange={(value) => setSelectedTimeframe(value as "daily" | "weekly" | "monthly")}
          >
            <SelectTrigger
              className="sm:hidden flex w-40 bg-[#1f1f1f] border-zinc-800 text-zinc-400"
              aria-label="Select a timeframe"
            >
              <SelectValue placeholder="Daily" className="text-xs" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-[#1f1f1f] border-zinc-800">
              <SelectItem value="daily" className="rounded-lg text-xs text-zinc-400 hover:text-zinc-50">
                Daily
              </SelectItem>
              <SelectItem value="weekly" className="rounded-lg text-xs text-zinc-400 hover:text-zinc-50">
                Weekly
              </SelectItem>
              <SelectItem value="monthly" className="rounded-lg text-xs text-zinc-400 hover:text-zinc-50">
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8">
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCalls" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#542CDE"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#542CDE"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#2a2a2a" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={isMobile ? 80 : 32}
              tick={{ fill: "#71717a", fontSize: 11 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `${value}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="calls"
              type="monotone"
              fill="url(#fillCalls)"
              stroke="#542CDE"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}

