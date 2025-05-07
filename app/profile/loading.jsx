import { Card } from "@/components/ui/card";

export default function ProfileLoading() {
  return (
    <div className="container max-w-4xl mx-auto">
      <div className="h-8 w-48 bg-muted rounded animate-pulse mb-6"></div>
      
      <Card className="overflow-hidden">
        <div className="bg-muted h-32 animate-pulse"></div>
        
        <div className="p-6">
          <div className="flex items-end justify-between">
            <div className="relative -mt-16">
              <div className="h-[100px] w-[100px] rounded-full bg-muted animate-pulse"></div>
            </div>
            <div>
              <div className="h-9 w-32 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-0 space-y-4">
          <div className="h-7 w-48 bg-muted rounded animate-pulse"></div>
          <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
          
          <div className="space-y-2 py-4">
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 py-2">
            <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
            <div className="h-5 w-52 bg-muted rounded animate-pulse"></div>
            <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
          </div>
          
          <div className="h-px w-full bg-muted"></div>
          
          <div className="space-y-4 pt-4">
            <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-5 w-72 bg-muted rounded animate-pulse"></div>
              <div className="h-5 w-60 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t">
          <div className="h-4 w-72 bg-muted rounded animate-pulse"></div>
        </div>
      </Card>
    </div>
  );
}