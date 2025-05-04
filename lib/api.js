// API utility for handling all REST Countries API requests

// Base URL for the REST Countries API - hardcoded instead of using env variable
const API_BASE_URL = "https://restcountries.com/v3.1"

// Helper function to handle API responses
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      // Add cache: 'no-store' to prevent caching issues during development
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`)
      return [] // Return empty array instead of throwing error
    }

    return await response.json()
  } catch (error) {
    console.error("API request error:", error)
    return [] // Return empty array on error
  }
}

// Get all countries with essential fields
export async function getAllCountries() {
  const fields = ["name", "population", "region", "capital", "flags", "cca3"]
  const data = await fetchAPI(`/all?fields=${fields.join(",")}`)
  
  // Sort countries alphabetically by common name
  const sortedData = (data || []).sort((a, b) => {
    return a.name.common.localeCompare(b.name.common)
  })
  
  return sortedData
}

// Get countries by search term (name)
export async function getCountriesByName(name) {
  if (!name) return []
  return fetchAPI(`/name/${name}`) || []
}

// Get countries by region
export async function getCountriesByRegion(region) {
  if (!region) return []
  return fetchAPI(`/region/${region}`) || []
}

// Get a specific country by its code
export async function getCountryByCode(code) {
  if (!code) return null
  try {
    const countries = await fetchAPI(`/alpha/${code}`)
    return countries?.[0] || null
  } catch (error) {
    console.error(`Error fetching country with code ${code}:`, error)
    return null
  }
}

// Get border countries from an array of country codes
export async function getBorderCountries(borderCodes) {
  if (!borderCodes || !borderCodes.length) return []

  // If there are no border codes, return an empty array
  if (borderCodes.length === 0) return []

  try {
    // Join the border codes with commas for the API request
    const codes = borderCodes.join(",")
    const fields = ["name", "cca3"]

    return (await fetchAPI(`/alpha?codes=${codes}&fields=${fields.join(",")}`)) || []
  } catch (error) {
    console.error("Error fetching border countries:", error)
    return []
  }
}
