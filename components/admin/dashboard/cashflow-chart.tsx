"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/admin/ui/chart";

const chartData = [
  { month: "January", income: 186, expense: 80 },
  { month: "February", income: 305, expense: 200 },
  { month: "March", income: 237, expense: 120 },
  { month: "April", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
];

const chartConfig = {
  expense: {
    label: "Expense",
    color: "var(--color-techtona-1)",
  },
  income: {
    label: "Income",
    color: "var(--color-techtona-2)",
  },
} satisfies ChartConfig;

export const CashflowChart = () => {
  return (
    <ChartContainer config={chartConfig} className="max-h-96 w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tick={{
            style: {
              fill: "var(--color-zinc-500)",
            },
          }}
          width={20}
          axisLine={false}
          tickLine={false}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-expense)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-expense)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-income)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-income)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="expense"
          type="natural"
          fill="url(#fillExpense)"
          fillOpacity={0.4}
          stroke="var(--color-expense)"
          stackId="a"
        />
        <Area
          dataKey="income"
          type="natural"
          fill="url(#fillIncome)"
          fillOpacity={0.4}
          stroke="var(--color-income)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};
