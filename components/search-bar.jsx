"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "@/lib/hooks"

export default function SearchBar({ defaultValue = "" }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(defaultValue)
  const debouncedValue = useDebounce(value, 300)

  useEffect(() => {
    try {
      const params = new URLSearchParams(searchParams)

      if (debouncedValue) {
        params.set("search", debouncedValue)
      } else {
        params.delete("search")
      }

      // Preserve other params like region
      router.push(`${pathname}?${params.toString()}`)
    } catch (error) {
      console.error("Error updating search params:", error)
    }
  }, [debouncedValue, pathname, router, searchParams])

  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-2.5 top-2.5 h-4 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for a country"
        className="pl-8"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
