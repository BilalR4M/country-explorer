"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useFavorites } from "@/components/favorites-provider";
import CountryGrid from "@/components/country-grid";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const { favorites } = useFavorites();
  const [isClient, setIsClient] = useState(false);
  const [localFavorites, setLocalFavorites] = useState([]);
  
  // Use this to ensure we're rendering on client side where localStorage is available
  useEffect(() => {
    setIsClient(true);
    setLocalFavorites(favorites);
  }, [favorites]);
  
  // Show loading state while session is loading
  if (status === "loading" || !isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading favorites...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6" /> My Favorites
        </h1>
      </div>
      
      {localFavorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h2 className="text-xl font-medium mb-2">No favorite countries yet</h2>
          <p className="text-muted-foreground mb-6">
            Add countries to your favorites by clicking the heart icon on country cards
          </p>
          <Button asChild>
            <a href="/">Explore Countries</a>
          </Button>
        </div>
      ) : (
        <CountryGrid countries={localFavorites} />
      )}
    </>
  );
}