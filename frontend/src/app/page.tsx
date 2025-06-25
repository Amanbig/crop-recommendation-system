"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  TrendingUp, 
  Brain, 
  Users, 
  Target, 
  CheckCircle,
  ArrowRight,
  Sprout,
  CloudRain,
  Thermometer,
  Droplets,
  Globe,
  Award,
  BarChart3,
  Lightbulb,
  ChevronDown
} from 'lucide-react';

export default function CropRecommendationFrontPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your soil and environmental data to provide accurate crop recommendations.",
      color: "bg-blue-500"
    },
    {
      icon: Target,
      title: "Precision Agriculture",
      description: "Get specific recommendations based on nitrogen, phosphorus, potassium levels, and environmental conditions.",
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Maximize Yield",
      description: "Optimize your harvest with data-driven insights that help you choose the most suitable crops for your land.",
      color: "bg-purple-500"
    },
    {
      icon: Globe,
      title: "Climate Adaptive",
      description: "Our system considers temperature, humidity, rainfall, and pH levels to ensure climate-appropriate recommendations.",
      color: "bg-orange-500"
    }
  ];

  const steps = [
    {
      icon: Droplets,
      title: "Input Soil Data",
      description: "Enter your soil's NPK values and pH level"
    },
    {
      icon: CloudRain,
      title: "Add Environment Info",
      description: "Provide temperature, humidity, and rainfall data"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI processes your data using advanced algorithms"
    },
    {
      icon: Sprout,
      title: "Get Recommendations",
      description: "Receive personalized crop suggestions with growing tips"
    }
  ];

  const stats = [
    { number: "10K+", label: "Farmers Helped", icon: Users },
    { number: "50+", label: "Crop Types", icon: Leaf },
    { number: "95%", label: "Accuracy Rate", icon: Target },
    { number: "30%", label: "Avg Yield Increase", icon: TrendingUp }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab, India",
      text: "This platform helped me increase my wheat yield by 25%. The AI recommendations were spot-on for my soil conditions.",
      rating: 5,
      crop: "Wheat"
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra, India",
      text: "As a new farmer, this tool gave me the confidence to choose the right crops. My first harvest exceeded all expectations!",
      rating: 5,
      crop: "Cotton"
    },
    {
      name: "Mohamed Ali",
      location: "Karnataka, India",
      text: "The detailed analysis of my soil helped me switch to more suitable crops. My farm's productivity has never been better.",
      rating: 5,
      crop: "Rice"
    }
  ];

  const cropGallery = [
    { name: "Rice", season: "Monsoon", image: "🌾" },
    { name: "Wheat", season: "Winter", image: "🌾" },
    { name: "Cotton", season: "Summer", image: "🌿" },
    { name: "Maize", season: "All Season", image: "🌽" },
    { name: "Sugarcane", season: "Winter", image: "🎋" },
    { name: "Potato", season: "Winter", image: "🥔" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">CropWise AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</a>
            <a href="#crops" className="text-gray-700 hover:text-green-600 transition-colors">Crops</a>
            <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            🚀 AI-Powered Agriculture
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Crop
            <span className="text-green-600 block">Recommendations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to make data-driven farming decisions. 
            Get personalized crop recommendations based on your soil and environmental conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              View Demo
            </Button>
          </div>
          
          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600">{stat.number}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <stat.icon className="h-4 w-4" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              ✨ Features
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CropWise AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced AI system provides comprehensive analysis and recommendations 
              tailored to your specific farming needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full ${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              🔍 Process
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get personalized crop recommendations in just four simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full">
                      <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Crop Gallery */}
      <section id="crops" className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              🌱 Crops
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supported Crops
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI can recommend from a wide variety of crops suitable for different seasons and conditions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {cropGallery.map((crop, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{crop.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{crop.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {crop.season}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-200">
              💬 Testimonials
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Farmers Say
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Award key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentTestimonial].location}</div>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800">
                    {testimonials[currentTestimonial].crop}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Optimize Your Harvest?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AI to make smarter farming decisions. 
            Start your analysis today and see the difference data-driven agriculture can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
              Get Started Now
              <Lightbulb className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">CropWise AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Crop Recommendations</li>
                <li>Soil Analysis</li>
                <li>Weather Integration</li>
                <li>Yield Prediction</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support Center</li>
                <li>Community Forum</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>help@cropwise.ai</li>
                <li>+91 12345 67890</li>
                <li>Chandigarh, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CropWise AI. All rights reserved. Built with ❤️ for farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}