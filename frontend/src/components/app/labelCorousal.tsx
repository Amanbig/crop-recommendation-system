"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, AlertCircle, Leaf } from "lucide-react";
import axios, { AxiosError } from "axios";

// Types
interface LabelResponse {
  labels: string[];
  images: Record<string, string>;
  descriptions?: Record<string, string>;
  plantingSeasons?: Record<string, string[]>;
}

interface ImageLoadState {
  [key: string]: boolean;
}

interface ImageErrorState {
  [key: string]: boolean;
}

// Constants
const API_TIMEOUT = 10000; // 10 seconds
const RETRY_DELAY = 2000; // 2 seconds

export default function LabelCarousel() {
  const [labels, setLabels] = useState<string[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [plantingSeasons, setPlantingSeasons] = useState<Record<string, string[]>>({});
  const [loaded, setLoaded] = useState<ImageLoadState>({});
  const [imageErrors, setImageErrors] = useState<ImageErrorState>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  // Fetch labels data
  const fetchLabels = useCallback(async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.get<LabelResponse>(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/labels`,
        {
          timeout: API_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { labels, images, descriptions = {}, plantingSeasons = {} } = response.data;
      
      if (!labels || !Array.isArray(labels) || labels.length === 0) {
        throw new Error("No crop labels found");
      }

      setLabels(labels);
      setImages(images || {});
      setDescriptions(descriptions);
      setPlantingSeasons(plantingSeasons);
      
      // Reset image states
      setLoaded({});
      setImageErrors({});
      
    } catch (err) {
      console.error("Failed to fetch labels:", err);
      
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          setError(`Server error: ${axiosError.response.status} - ${axiosError.response.statusText}`);
        } else if (axiosError.request) {
          setError("Network error: Unable to connect to the server");
        } else {
          setError(`Request error: ${axiosError.message}`);
        }
      } else {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  // Auto-retry on error
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        fetchLabels();
      }, RETRY_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [error, retryCount, fetchLabels]);

  // Handle image load success
  const handleImageLoad = useCallback((label: string) => {
    setLoaded(prev => ({ ...prev, [label]: true }));
  }, []);

  // Handle image load error
  const handleImageError = useCallback((label: string) => {
    setImageErrors(prev => ({ ...prev, [label]: true }));
    setLoaded(prev => ({ ...prev, [label]: true })); // Stop showing skeleton
  }, []);

  // Manual retry
  const handleRetry = useCallback(() => {
    setRetryCount(0);
    fetchLabels();
  }, [fetchLabels]);

  // Format crop name for display
  const formatCropName = useCallback((name: string) => {
    return name
      .split(/[_-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, []);

  // Get season colors
  const getSeasonColor = (season: string) => {
    const colors: Record<string, string> = {
      spring: "bg-green-100 text-green-800",
      summer: "bg-yellow-100 text-yellow-800",
      autumn: "bg-orange-100 text-orange-800",
      winter: "bg-blue-100 text-blue-800",
      monsoon: "bg-cyan-100 text-cyan-800",
      'year-round': "bg-purple-100 text-purple-800",
    };
    return colors[season.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  // Loading state
  if (isLoading && labels.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-700 flex items-center justify-center gap-2">
            <Leaf className="h-6 w-6" />
            Crop Gallery
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <Skeleton className="w-full aspect-square rounded-md mb-3" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex gap-1 justify-center">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error && labels.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to Load Crops</h3>
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry {retryCount > 0 && `(${retryCount}/3)`}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (labels.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <Leaf className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Crops Available</h3>
          <p className="text-gray-600 mb-4">
            No crop data is currently available. Please try again later.
          </p>
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
          <Leaf className="h-8 w-8" />
          Crop Gallery
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Explore different crops and their growing seasons
        </p>
      </CardHeader>

      {/* Error banner for partial failures */}
      {error && labels.length > 0 && (
        <Alert variant="destructive" className="mb-4 max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Some data may be incomplete due to connection issues.
            <Button 
              onClick={handleRetry} 
              variant="ghost" 
              size="sm" 
              className="ml-2 h-6 px-2"
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {labels.map((label, index) => (
            <CarouselItem key={label} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <CardContent className="p-4 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-gray-100">
                    {!loaded[label] && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    
                    {images[label] && !imageErrors[label] && (
                      <Image
                        src={images[label]}
                        alt={`${formatCropName(label)} crop`}
                        fill
                        className={`object-cover transition-all duration-300 hover:scale-105 ${
                          loaded[label] ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => handleImageLoad(label)}
                        onError={() => handleImageError(label)}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    )}
                    
                    {(imageErrors[label] || !images[label]) && loaded[label] && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                        <Leaf className="h-8 w-8 mb-2" />
                        <span className="text-xs">Image unavailable</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
                      {formatCropName(label)}
                    </h3>
                    
                    {descriptions[label] && (
                      <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2">
                        {descriptions[label]}
                      </p>
                    )}
                    
                    {/* Planting Seasons */}
                    {plantingSeasons[label] && plantingSeasons[label].length > 0 && (
                      <div className="mt-auto">
                        <p className="text-xs text-gray-500 mb-1 text-center">Best planting seasons:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {plantingSeasons[label].slice(0, 3).map((season) => (
                            <Badge
                              key={season}
                              variant="secondary"
                              className={`text-xs px-2 py-1 ${getSeasonColor(season)}`}
                            >
                              {season}
                            </Badge>
                          ))}
                          {plantingSeasons[label].length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-1">
                              +{plantingSeasons[label].length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Stats */}
      <div className="text-center mt-6 text-sm text-gray-500">
        Showing {labels.length} crops • 
        {isLoading && <span className="ml-1">Loading...</span>}
        {!isLoading && (
          <Button 
            onClick={handleRetry} 
            variant="ghost" 
            size="sm" 
            className="ml-1 h-6 px-2 text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}