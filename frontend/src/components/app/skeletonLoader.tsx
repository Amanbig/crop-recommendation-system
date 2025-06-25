import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonLoader() {
  return (
    <Card className="max-w-lg mx-auto shadow-lg animate-pulse">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Image skeleton */}
        <Skeleton className="w-full h-64 rounded-lg" />
        
        {/* Loading message */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent" />
            <span className="text-sm font-medium text-green-700">
              Analyzing your data...
            </span>
          </div>
          <p className="text-xs text-gray-500">
            This may take a few seconds
          </p>
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="flex-1 h-9" />
          <Skeleton className="flex-1 h-9" />
          <Skeleton className="w-16 h-9" />
        </div>
        
        {/* Message skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}

// Alternative compact skeleton for inline loading
export function CompactSkeletonLoader() {
  return (
    <div className="flex items-center justify-center space-x-4 p-6">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-600 border-t-transparent" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
    </div>
  );
}