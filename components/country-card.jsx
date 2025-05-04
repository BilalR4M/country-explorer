import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CountryCard({ country }) {
  return (
    <Link href={`/country/${country.cca3}`} className="block h-full">
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative aspect-[4/3]">
          <Image
            src={country.flags?.svg || country.flags?.png || "/placeholder.svg?height=400&width=600"}
            alt={country.flags?.alt || `Flag of ${country.name?.common || "Country"}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="pb-2">
          <h2 className="font-bold text-lg line-clamp-1">{country.name?.common || "Country"}</h2>
        </CardHeader>
        <CardContent className="pb-4 space-y-1 text-sm">
          <p>
            <span className="font-medium">Population:</span> {country.population?.toLocaleString() || "N/A"}
          </p>
          <p>
            <span className="font-medium">Region:</span> {country.region || "N/A"}
          </p>
          <p>
            <span className="font-medium">Capital:</span> {country.capital?.join(", ") || "N/A"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
