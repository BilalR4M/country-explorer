"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Github, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="container max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
        
        <div className="relative px-6">
          <div className="relative -mt-16 flex items-end justify-between">
            <div className="relative">
              <Image
                src={user?.image || "/placeholder-user.jpg"}
                alt={user?.name || "Profile picture"}
                width={100}
                height={100}
                className="rounded-full border-4 border-background bg-background"
                priority
              />
            </div>
            <div>
              <Link href={user?.html_url || "https://github.com"} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>@{user?.login}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {user?.bio && (
            <p>{user.bio}</p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            {user?.location && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                <strong>{user?.followers || 0}</strong> followers · <strong>{user?.following || 0}</strong> following
              </span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Details</h3>
            <dl className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-medium text-muted-foreground">Email:</dt>
                <dd>{user?.email || "No email provided"}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/50 py-4">
          <p className="text-xs text-muted-foreground">
            Profile information fetched from GitHub via NextAuth.js
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}