"use client"

import { useMemo } from "react"
import CountryCard from "@/components/country-card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function CountryGrid({ countries, search, region, page = 1, onPageChange }) {
  const ITEMS_PER_PAGE = 8
  
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

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)
  const currentPage = Math.min(Math.max(1, page), totalPages || 1)
  
  // Get current page's countries
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredCountries.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredCountries, currentPage])

  if (!filteredCountries.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No countries found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(currentPage - 1)
                  }} 
                />
              </PaginationItem>
            )}
            
            {/* First page */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(1)
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            
            {/* Ellipsis */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            {/* Page before current */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(currentPage - 1)
                  }}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {/* Current page */}
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            
            {/* Page after current */}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(currentPage + 1)
                  }}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {/* Ellipsis */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            {/* Last page */}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(totalPages)
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(currentPage + 1)
                  }} 
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
