import React, { useState } from "react"

import "chartjs-adapter-date-fns"

import type { RouterOutputs } from "@habitsync/api"
import { getLabelsForCompletionGraph } from "@habitsync/lib"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js"
import { BarChart2 } from "lucide-react"
import { Bar } from "react-chartjs-2"

import TabToggle from "../ui/tabToggle"
import CompletionsGraphSelect from "./completionsGraphSelect"

ChartJS.register(
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  TimeScale,
)

type Props = {
  timestamps: RouterOutputs["timestamp"]["getSummaryCounts"]
}

export type ActivePeriod = "week" | "month" | "year"

const CompletionsGraph = ({ timestamps }: Props) => {
  const [toggledPeriod, setTogglePeriod] = useState<ActivePeriod>("week")

  const handlePeriodChange = (period: ActivePeriod) => {
    setTogglePeriod(period)
  }

  const { groupedByWeek, groupedByMonth, groupedByYear } = timestamps

  const activeOption =
    toggledPeriod === "week"
      ? groupedByWeek
      : toggledPeriod === "month"
      ? groupedByMonth
      : groupedByYear

  const data = {
    labels: getLabelsForCompletionGraph(timestamps, toggledPeriod),
    datasets: [
      {
        label: "Completions",
        data: Object.values(activeOption),
        fill: false,
      },
    ],
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-muted-foreground text-lg">Completions overview</h1>
        <CompletionsGraphSelect
          activePeriod={toggledPeriod}
          setPeriod={handlePeriodChange}
        />
      </div>
      <Bar
        options={{
          color: "var(--primary)",
          font: {
            family: "Inter",
          },
          animation: {
            duration: 2000,
          },
          scales: {
            x: {
              border: {
                display: false,
              },
              grid: {
                display: false,
                drawTicks: false,
              },
              ticks: {
                font: {
                  size: 13,
                },
              },
            },
            y: {
              border: {
                display: false,
              },
              grid: {
                display: false,
                drawTicks: false,
              },
              ticks: {
                callback: (value) => {
                  return value.toString()
                },
                font: {
                  size: 13,
                },
              },
            },
          },
          layout: {
            padding: {
              top: 20,
            },
          },
          elements: {
            bar: {
              backgroundColor: "hsla(253, 42.2%, 26.2%)",
              borderRadius: {
                topLeft: 20,
                topRight: 20,
              },
            },
          },
          normalized: true,
          plugins: {
            tooltip: {
              enabled: true,
              displayColors: false,
              titleAlign: "center",
              titleMarginBottom: 10,
              backgroundColor: "hsla(253, 42.2%, 26.2%)",
              callbacks: {
                title: (context) => {
                  if (toggledPeriod === "week") {
                    return `Week ${context[0]?.label}`
                  }
                  return `${context[0]?.label}`
                },
                label: (context) => {
                  return `Completed ${context.parsed.y} times`
                },
              },
            },
            legend: {
              display: false,
            },
          },
        }}
        data={data}
      />
    </>
  )
}

export default CompletionsGraph
