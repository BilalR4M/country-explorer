import { getCountryByCode, getBorderCountries } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {
  try {
    // Await params before accessing properties
    const resolvedParams = await params
    const code = resolvedParams?.code
    if (!code) return { title: "Country Not Found" }
    
    const country = await getCountryByCode(code)
    if (!country) return { title: "Country Not Found" }
    return { title: `${country.name.common} | Country Explorer` }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return { title: "Country Explorer" }
  }
}

export default async function CountryPage({ params }) {
  let country = null
  let borderCountries = []

  try {
    // Await params before accessing properties
    const resolvedParams = await params
    const code = resolvedParams?.code
    if (!code) {
      notFound()
    }
    
    country = await getCountryByCode(code)

    if (!country) {
      notFound()
    }

    // Only try to get border countries if we have a valid country
    try {
      borderCountries = await getBorderCountries(country.borders || [])
    } catch (borderError) {
      console.error("Error fetching border countries:", borderError)
    }
  } catch (error) {
    console.error("Error fetching country details:", error)
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Countries
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
          <Image
            src={country.flags?.svg || country.flags?.png || "/placeholder.svg?height=400&width=600"}
            alt={country.flags?.alt || `Flag of ${country.name?.common || "Country"}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{country.name?.common || "Country"}</h1>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Official Name:</span> {country.name?.official || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Population:</span> {country.population?.toLocaleString() || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span> {country.subregion || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Capital:</span> {country.capital?.join(", ") || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span> {country.tld?.join(", ") || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="pt-4">
              <h2 className="font-semibold mb-2">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Link key={border.cca3} href={`/country/${border.cca3}`}>
                    <Button variant="outline" size="sm">
                      {border.name?.common || border.cca3}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
