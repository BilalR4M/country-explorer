"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import SearchBar from "@/components/search-bar"
import RegionFilter from "@/components/region-filter"
import CountryGrid from "@/components/country-grid"
import { getAllCountries } from "@/lib/api"

export default function HomePage() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  const search = searchParams?.get("search") || ""
  const region = searchParams?.get("region") || ""

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCountries()
        setCountries(data)
      } catch (error) {
        console.error("Error fetching countries:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Explore Countries</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full md:w-2/3">
          <SearchBar defaultValue={search} />
          <RegionFilter defaultValue={region === "" ? "all" : region} />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array(8)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card text-card-foreground shadow-sm h-[300px] animate-pulse"
              />
            ))}
        </div>
      ) : (
        <CountryGrid countries={countries} search={search} region={region} />
      )}
    </div>
  )
}