import React, { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Download, RefreshCw } from 'lucide-react';

interface PredictionResponse {
  prediction: string;
  image: string;
  confidence?: number;
  recommendations?: string[];
}

interface Props {
  result: PredictionResponse;
  onNewPrediction?: () => void;
}

export default function PredictionResult({ result, onNewPrediction }: Props) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Crop Recommendation',
          text: `Recommended crop: ${result.prediction}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(
          `Recommended crop: ${result.prediction}\n${window.location.href}`
        );
        alert('Copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  const handleDownload = () => {
    if (result.image) {
      const link = document.createElement('a');
      link.href = result.image;
      link.download = `${result.prediction}-crop-recommendation.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatCropName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="max-w-lg mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🌾</span>
          <CardTitle className="text-2xl font-bold text-green-700">
            Recommendation Result
          </CardTitle>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <Badge 
            variant="secondary" 
            className="text-lg px-4 py-2 bg-green-100 text-green-800 border-green-200"
          >
            {formatCropName(result.prediction)}
          </Badge>
          
          {result.confidence && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Confidence:</span>
              <Badge variant="outline" className="text-sm">
                {Math.round(result.confidence * 100)}%
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Image Section */}
        <div className="relative">
          {imageLoading && !imageError && (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-600 border-t-transparent" />
            </div>
          )}
          
          {result.image && !imageError && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src={result.image}
                alt={`${result.prediction} crop`}
                fill
                className="object-cover transition-opacity duration-300"
                style={{ opacity: imageLoading ? 0 : 1 }}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          {imageError && (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500">
              <span className="text-4xl mb-2">🌱</span>
              <p className="text-sm">Image not available</p>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              💡 Growing Tips
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              {result.recommendations.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleShare}
            variant="outline" 
            size="sm"
            className="flex-1 gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          {result.image && !imageError && (
            <Button 
              onClick={handleDownload}
              variant="outline" 
              size="sm"
              className="flex-1 gap-2"
            >
              <Download className="h-4 w-4" />
              Save Image
            </Button>
          )}
          
          {onNewPrediction && (
            <Button 
              onClick={onNewPrediction}
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              New
            </Button>
          )}
        </div>

        {/* Success Message */}
        <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
          <span className="font-medium text-green-700">
            ✅ Based on your soil and environmental conditions, {formatCropName(result.prediction)} is recommended for optimal yield.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}