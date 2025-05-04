"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const regions = [
  { value: "all", label: "All Regions" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
]

export default function RegionFilter({ defaultValue = "all" }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleValueChange = (value) => {
    try {
      const params = new URLSearchParams(searchParams)

      if (value && value !== "all") {
        params.set("region", value)
      } else {
        params.delete("region")
      }

      // Preserve other params like search
      router.push(`${pathname}?${params.toString()}`)
    } catch (error) {
      console.error("Error updating region params:", error)
    }
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region.value} value={region.value}>
            {region.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
