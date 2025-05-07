"use client"

import { createContext, useContext, useEffect, useState } from "react"

const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
})

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from local storage on initial render only in client
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
      setIsLoaded(true)
    } catch (error) {
      console.error("Error loading favorites from local storage:", error)
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to local storage when they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Error saving favorites to local storage:", error)
      }
    }
  }, [favorites, isLoaded])

  const addFavorite = (country) => {
    setFavorites((prev) => {
      // Don't add duplicates
      if (prev.some((fav) => fav.cca3 === country.cca3)) {
        return prev
      }

      // We store only essential information about the country
      const favoriteCountry = {
        cca3: country.cca3,
        name: country.name,
        flags: country.flags,
        population: country.population,
        region: country.region,
        capital: country.capital,
      }

      return [...prev, favoriteCountry]
    })
  }

  const removeFavorite = (countryCode) => {
    setFavorites((prev) => prev.filter((country) => country.cca3 !== countryCode))
  }

  const isFavorite = (countryCode) => {
    return favorites.some((country) => country.cca3 === countryCode)
  }

  const clearFavorites = () => {
    // Directly clear localStorage first to ensure it's updated
    try {
      localStorage.removeItem("favorites")
      // Then update the state
      setFavorites([])
    } catch (error) {
      console.error("Error clearing favorites:", error)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}