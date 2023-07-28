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
import { Bar } from "react-chartjs-2"

import TabToggle from "../ui/tabToggle"

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

  const handlePeriodChange = (period: string) => {
    setTogglePeriod(period as ActivePeriod)
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
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  return (
    <div>
      <TabToggle
        options={["week", "month", "year"]}
        activeOption={toggledPeriod}
        onToggleChange={handlePeriodChange}
      />
      <Bar
        options={{
          color: "var(--primary)",
          font: {
            family: "Inter",
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
            },
            y: {
              border: {
                display: false,
              },
              grid: {
                display: false,
                drawTicks: false,
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
              backgroundColor: "hsla(222.2, 47.4%, 11.2%)",
              borderRadius: {
                topLeft: 4,
                topRight: 4,
              },
            },
          },
          normalized: true,
          plugins: {
            tooltip: {},
            legend: {
              display: false,
            },
          },
        }}
        data={data}
      />
    </div>
  )
}

export default CompletionsGraph
