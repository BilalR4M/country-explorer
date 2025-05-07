import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useFavorites } from "./favorites-provider"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function CountryCard({ country }) {
  const { data: session } = useSession()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [isHovered, setIsHovered] = useState(false)
  
  const isFav = isFavorite(country.cca3)
  
  const handleFavoriteClick = (e) => {
    e.preventDefault() // Prevent navigating to country detail
    e.stopPropagation()
    
    if (isFav) {
      removeFavorite(country.cca3)
    } else {
      addFavorite(country)
    }
  }
  
  return (
    <Link 
      href={`/country/${country.cca3}`} 
      className="block h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative aspect-[4/3]">
          <Image
            src={country.flags?.svg || country.flags?.png || "/placeholder.svg?height=400&width=600"}
            alt={country.flags?.alt || `Flag of ${country.name?.common || "Country"}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Favorite button - only show for logged in users */}
          {session && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-2 right-2 rounded-full p-1.5 bg-background/80 backdrop-blur-sm",
                "transition-opacity",
                (!isHovered && !isFav) ? "opacity-0" : "opacity-100"
              )}
              onClick={handleFavoriteClick}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={cn("h-5 w-5", isFav ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
            </Button>
          )}
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
