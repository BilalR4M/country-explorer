import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";

export default function FavoritesLoading() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6" /> My Favorites
        </h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-full">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-full">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                </div>
                <div className="p-6 pt-0 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}