"use client";
import axios, { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SkeletonLoader } from "./skeletonLoader";
import PredictionResult from "./predictionResult";

// Types
interface FormData {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

interface PredictionResponse {
  prediction: string;
  image: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// Form field configuration
const FORM_FIELDS = [
  { name: 'N', label: 'Nitrogen (N)', placeholder: 'Enter nitrogen content', min: 0, max: 300, unit: 'kg/ha' },
  { name: 'P', label: 'Phosphorous (P)', placeholder: 'Enter phosphorous content', min: 0, max: 150, unit: 'kg/ha' },
  { name: 'K', label: 'Potassium (K)', placeholder: 'Enter potassium content', min: 0, max: 300, unit: 'kg/ha' },
  { name: 'temperature', label: 'Temperature', placeholder: 'Enter temperature', min: -10, max: 50, unit: '°C' },
  { name: 'humidity', label: 'Humidity', placeholder: 'Enter humidity percentage', min: 0, max: 100, unit: '%' },
  { name: 'ph', label: 'pH Level', placeholder: 'Enter soil pH level', min: 0, max: 14, unit: 'pH', step: 0.1 },
  { name: 'rainfall', label: 'Rainfall', placeholder: 'Enter rainfall amount', min: 0, max: 1000, unit: 'mm' },
] as const;

const INITIAL_FORM_DATA: FormData = {
  N: 0,
  P: 0,
  K: 0,
  temperature: 0,
  humidity: 0,
  ph: 0,
  rainfall: 0,
};

export default function PredictionForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Validation function
  const validateForm = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    FORM_FIELDS.forEach(field => {
      const value = formData[field.name as keyof FormData];
      
      if (value === 0 || value === null || value === undefined) {
        errors[field.name] = `${field.label} is required`;
      } else if (value < field.min || value > field.max) {
        errors[field.name] = `${field.label} must be between ${field.min} and ${field.max}`;
      }
    });

    return errors;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    
    setFormData(prev => ({
      ...prev,
      [name]: numericValue
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post<PredictionResponse>(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/predict`,
        formData,
        {
          timeout: 30000, // 30 second timeout
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setPrediction(response.data);
    } catch (err) {
      console.error("Prediction error:", err);
      
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          setError(`Server error: ${axiosError.response.status} - ${axiosError.response.statusText}`);
        } else if (axiosError.request) {
          setError("Network error: Unable to connect to the server. Please check your connection.");
        } else {
          setError(`Request error: ${axiosError.message}`);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setPrediction(null);
    setError("");
    setValidationErrors({});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header - always visible */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            🌱 Crop Recommendation System
          </h1>
          <p className="text-gray-600">
            Enter soil and environmental parameters to get crop recommendations
          </p>
        </div>

        {/* Main content area */}
        <div className={`grid gap-8 ${prediction && !loading ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
          {/* Form Section */}
          <div className={prediction && !loading ? '' : 'w-full'}>
            <Card className="shadow-lg h-fit">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-700">
                  Input Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {FORM_FIELDS.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name} className="text-sm font-medium">
                          {field.label} {field.unit && `(${field.unit})`}
                        </Label>
                        <Input
                          id={field.name}
                          type="number"
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof FormData] || ''}
                          onChange={handleChange}
                          min={field.min}
                          max={field.max}
                          step={(field as any).step || 1}
                          className={`transition-colors ${
                            validationErrors[field.name] 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'focus:border-green-500'
                          }`}
                          disabled={loading}
                          required
                          aria-describedby={validationErrors[field.name] ? `${field.name}-error` : undefined}
                        />
                        {validationErrors[field.name] && (
                          <p 
                            id={`${field.name}-error`}
                            className="text-sm text-red-600"
                            role="alert"
                          >
                            {validationErrors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Predicting...
                        </>
                      ) : (
                        '🔍 Get Crop Recommendation'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleReset}
                      disabled={loading}
                      className="px-6"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {loading && (
            <div className={prediction ? '' : 'mt-8'}>
              <SkeletonLoader />
            </div>
          )}

          {prediction && !loading && (
            <div className="animate-fade-in">
              <PredictionResult result={prediction} onNewPrediction={handleReset} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}