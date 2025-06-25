"use client"

import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Sun, 
  Moon, 
  BarChart3, 
  Database, 
  BookOpen, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users,
  ArrowRight,
  Sprout,
  Target,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';

export default function CropRecommendationHomepage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navigationItems = [
    { name: 'Labels', href: '/labels', icon: Target, description: 'View crop labels and categories' },
    { name: 'Recommendation', href: '/recommendation', icon: Brain, description: 'Get AI-powered crop predictions' },
    { name: 'Dataset', href: '/dataset', icon: Database, description: 'Explore our comprehensive dataset' },
    { name: 'Notebook', href: '/notebook', icon: BookOpen, description: 'Interactive Jupyter notebooks' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze soil conditions, climate data, and historical patterns to recommend optimal crops.'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Comprehensive analytics dashboard providing detailed insights into crop performance and environmental factors.'
    },
    {
      icon: Shield,
      title: 'Reliable Accuracy',
      description: 'Our models achieve 95%+ accuracy rates, validated against real-world agricultural outcomes and expert knowledge.'
    },
    {
      icon: TrendingUp,
      title: 'Yield Optimization',
      description: 'Maximize your harvest potential with recommendations tailored to your specific land conditions and resources.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Successful Predictions' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '50+', label: 'Crop Varieties' },
    { number: '1,000+', label: 'Happy Farmers' }
  ];

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'dark bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900/80 border-gray-800' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-green-600' : 'bg-green-500'}`}>
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                CropAI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    isDark 
                      ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                      : 'hover:bg-white/60 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:scale-110 transition-transform duration-200"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full px-4 py-2 mb-8 border border-green-200/20">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                AI-Powered Agriculture
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Crop
              </span>
              <br />
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Recommendations
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Harness the power of artificial intelligence to make data-driven farming decisions. 
              Get personalized crop recommendations based on soil conditions, climate data, and market trends.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a href="/recommendation" className="flex items-center space-x-2">
                  <Sprout className="h-5 w-5" />
                  <span>Get Recommendation</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className={`px-8 py-6 text-lg font-semibold rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500' 
                    : 'border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400'
                }`}
              >
                <a href="/dataset" className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Explore Data</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Why Choose 
              </span>
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent ml-2">
                CropAI?
              </span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Our advanced platform combines cutting-edge AI technology with agricultural expertise 
              to provide you with the most accurate crop recommendations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-xl ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm' 
                  : 'bg-white/80 hover:bg-white backdrop-blur-sm'
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-gradient-to-br from-green-600 to-blue-600' : 'bg-gradient-to-br from-green-500 to-blue-500'
                  }`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-center leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Explore Our 
              </span>
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent ml-2">
                Platform
              </span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover all the tools and resources available to help you make informed agricultural decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationItems.map((item, index) => (
              <Card key={index} className={`group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-xl overflow-hidden ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm' 
                  : 'bg-white/80 hover:bg-white backdrop-blur-sm'
              }`}>
                <a href={item.href} className="block">
                  <CardHeader className="text-center pb-4 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 ${
                      isDark ? 'bg-gray-700 group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:to-blue-600' : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-blue-500'
                    }`}>
                      <item.icon className={`h-7 w-7 transition-colors duration-300 ${
                        isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-white'
                      }`} />
                    </div>
                    <CardTitle className={`text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className={`text-center text-sm leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className={`border-0 shadow-2xl overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
              : 'bg-gradient-to-br from-white to-gray-50'
          }`}>
            <CardContent className="p-12">
              <div className="mb-8">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  isDark ? 'bg-gradient-to-br from-green-600 to-blue-600' : 'bg-gradient-to-br from-green-500 to-blue-500'
                }`}>
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    Ready to Transform Your 
                  </span>
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent ml-2">
                    Farming?
                  </span>
                </h2>
                <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Join thousands of farmers who have already improved their crop yields with our AI-powered recommendations.
                </p>
              </div>
              
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <a href="/recommendation" className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${
        isDark 
          ? 'bg-gray-900/50 border-gray-800' 
          : 'bg-white/50 border-gray-200'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-green-600' : 'bg-green-500'}`}>
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                CropAI
              </span>
            </div>
            
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 CropAI. Empowering agriculture with artificial intelligence.
            </div>
            <p> Amanpreet Singh. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="https://github.com/Amanbig" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/amanpreet-singh-9a1929211" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}