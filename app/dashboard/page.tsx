import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <SectionCards />
      </div>
      <div className="px-4 lg:px-6 py-4">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  )
}