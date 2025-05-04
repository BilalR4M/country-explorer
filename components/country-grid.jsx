"use client"

import { useMemo } from "react"
import CountryCard from "@/components/country-card"

export default function CountryGrid({ countries, search, region }) {
  const filteredCountries = useMemo(() => {
    if (!countries) return []

    return countries.filter((country) => {
      // Filter by search term
      const matchesSearch = search
        ? country.name?.common?.toLowerCase().includes(search.toLowerCase()) ||
          country.name?.official?.toLowerCase().includes(search.toLowerCase())
        : true

      // Filter by region - handle "all" value
      const matchesRegion = region && region !== "all" ? country.region?.toLowerCase() === region.toLowerCase() : true

      return matchesSearch && matchesRegion
    })
  }, [countries, search, region])

  if (!filteredCountries.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No countries found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredCountries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
