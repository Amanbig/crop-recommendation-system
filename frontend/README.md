# 🌱 Crop Recommendation Frontend

A modern, responsive Next.js web application that provides an intuitive interface for the Crop Recommendation System. Built with TypeScript, Tailwind CSS, and shadcn/ui components for a seamless user experience.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Docker Usage](#docker-usage)
- [Development](#development)
- [Components](#components)
- [Styling](#styling)
- [Contributing](#contributing)

## 🔍 Overview

This frontend application serves as the user interface for the Crop Recommendation System. It provides farmers and agricultural professionals with an easy-to-use platform to get intelligent crop recommendations based on soil and environmental parameters.

The application is built with Next.js 14 using the App Router, TypeScript for type safety, and modern UI components for an exceptional user experience across all devices.

## ✨ Features

### 🎯 Core Features
- **Intelligent Crop Recommendations**: Interactive form for inputting soil and environmental data
- **Real-time Predictions**: Instant crop recommendations with visual results
- **Dataset Explorer**: Browse and paginate through the training dataset
- **Jupyter Notebook Viewer**: Integrated notebook viewer with syntax highlighting
- **Crop Gallery**: Visual catalog of all supported crops with carousel navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 Technical Features
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Form Validation**: Comprehensive client-side validation with error messages
- **Loading States**: Skeleton loaders and loading indicators for better UX
- **Error Handling**: User-friendly error messages and retry mechanisms
- **Image Optimization**: Next.js Image component for optimized loading
- **Type Safety**: Full TypeScript integration with custom type definitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠 Technology Stack

- **Next.js 14**: React framework with App Router and Server Components
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Modern, accessible UI component library
- **Lucide React**: Beautiful, customizable icons
- **Axios**: Promise-based HTTP client for API requests
- **React Markdown**: Markdown rendering for notebook content
- **React Syntax Highlighter**: Code syntax highlighting
- **next-themes**: Theme management with system preference detection

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun package manager
- Docker (optional, for containerized deployment)

## 🚀 Installation

### Local Development Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   BACKEND_URL=http://localhost:8000
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎯 Usage

### Navigation

The application features a clean navigation structure:

- **Home**: Welcome page with system overview
- **Recommendation**: Main prediction interface
- **Dataset**: Training data exploration
- **Notebook**: ML development process viewer
- **Labels**: Crop gallery and information

### Making Predictions

1. Navigate to the **Recommendation** page
2. Fill in the required parameters:
   - Nitrogen (N): 0-300 kg/ha
   - Phosphorous (P): 0-150 kg/ha
   - Potassium (K): 0-300 kg/ha
   - Temperature: -10 to 50°C
   - Humidity: 0-100%
   - pH Level: 0-14
   - Rainfall: 0-1000mm
3. Click "Get Crop Recommendation"
4. View the recommended crop with additional information

### Exploring Data

- **Dataset Page**: Browse training data with pagination
- **Notebook Page**: View the complete ML pipeline
- **Labels Page**: Explore crop gallery with images and information

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (proxy to backend)
│   │   │   ├── data/          # Dataset API endpoint
│   │   │   ├── labels/        # Labels API endpoint
│   │   │   ├── notebook/      # Notebook API endpoint
│   │   │   ├── predict/       # Prediction API endpoint
│   │   │   └── health/        # Health check endpoint
│   │   ├── dataset/           # Dataset exploration page
│   │   ├── labels/            # Crop gallery page
│   │   ├── notebook/          # Notebook viewer page
│   │   ├── recommendation/    # Main prediction page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── app/              # Application-specific components
│   │   │   ├── dataTable.tsx
│   │   │   ├── labelCarousel.tsx
│   │   │   ├── noteBookViewer.tsx
│   │   │   ├── predictionForm.tsx
│   │   │   ├── predictionResult.tsx
│   │   │   └── skeletonLoader.tsx
│   │   └── ui/               # Reusable UI components (shadcn/ui)
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── .env.local               # Environment variables
├── .env.example             # Environment variables template
├── components.json          # shadcn/ui configuration
├── Dockerfile              # Docker configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔌 API Integration

The frontend uses Next.js API routes as a proxy layer to the FastAPI backend:

### API Routes Structure

```typescript
// Example API route: /api/predict/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const response = await fetch(`${BACKEND_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  return NextResponse.json(await response.json());
}
```

### API Endpoints

- `GET /api/labels` - Fetch crop labels and images
- `GET /api/data` - Retrieve dataset with pagination
- `POST /api/predict` - Make crop predictions
- `GET /api/notebook` - Get Jupyter notebook content
- `GET /api/health` - Health check endpoint

## 🐳 Docker Usage

### Development with Docker

```bash
# Build development image
docker build -t crop-frontend-dev --target deps .

# Run development container
docker run -p 3000:3000 -v $(pwd):/app crop-frontend-dev npm run dev
```

### Production with Docker

```bash
# Build production image
docker build -t crop-frontend .

# Run production container
docker run -p 3000:3000 crop-frontend
```

### Docker Compose

```bash
# Start frontend service (from root directory)
docker-compose up frontend

# Build and start
docker-compose up --build frontend
```

## 💻 Development

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting with consistent style
- **Tailwind CSS**: Utility-first styling approach

### Adding New Components

1. **Create component file**:
   ```typescript
   // src/components/app/newComponent.tsx
   import React from 'react';
   
   export default function NewComponent() {
     return <div>New Component</div>;
   }
   ```

2. **Add types if needed**:
   ```typescript
   // src/types/newTypes.ts
   export interface NewComponentProps {
     data: string;
   }
   ```

3. **Export and use**:
   ```typescript
   import NewComponent from '@/components/app/newComponent';
   ```

### Environment Variables

```env
# Backend API URL (for server-side requests)
BACKEND_URL=http://localhost:8000

# Public API URL (for client-side requests)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Node environment
NODE_ENV=development
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS variables for theme colors
- Leverage shadcn/ui components for consistency

## 🧩 Components

### Core Components

1. **PredictionForm**: Main form for inputting crop parameters
2. **PredictionResult**: Displays prediction results with images
3. **DataTable**: Paginated table for dataset exploration
4. **LabelCarousel**: Crop gallery with image carousel
5. **NotebookViewer**: Jupyter notebook renderer with syntax highlighting
6. **SkeletonLoader**: Loading state component

### UI Components

- Built with shadcn/ui for consistency
- Fully accessible with ARIA support
- Dark/light theme compatible
- Mobile-responsive design

## 🎨 Styling

### Tailwind Configuration

```javascript
// tailwind.config.ts
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
```

### Theme System

- Automatic dark/light mode detection
- Manual theme toggle
- CSS variables for dynamic theming
- Consistent color scheme across components

## 🧪 Testing

### Manual Testing

```bash
# Start development server
npm run dev

# Test in browser
open http://localhost:3000

# Test API endpoints
curl http://localhost:3000/api/health
```

### Build Testing

```bash
# Test production build
npm run build
npm start

# Test Docker build
docker build -t test-frontend .
docker run -p 3000:3000 test-frontend
```

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **API Connection Issues**:
   - Check `BACKEND_URL` in environment variables
   - Ensure backend is running on port 8000
   - Verify API routes are correctly configured

3. **Styling Issues**:
   ```bash
   # Rebuild Tailwind CSS
   npm run dev
   
   # Check Tailwind configuration
   npx tailwindcss --help
   ```

4. **TypeScript Errors**:
   ```bash
   # Type check
   npm run type-check
   
   # Generate types
   npm run dev
   ```

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - Configure image domains in `next.config.ts`

2. **Bundle Analysis**:
   ```bash
   npm run analyze
   ```

3. **Code Splitting**:
   - Use dynamic imports for large components
   - Implement lazy loading for images

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Make changes and test**
5. **Build and verify**:
   ```bash
   npm run build
   npm run type-check
   ```

6. **Submit pull request**

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Components are responsive and accessible
- [ ] Error handling is implemented
- [ ] Loading states are included
- [ ] Code follows style guidelines
- [ ] No console errors or warnings

## 📞 Support

For questions and support:

1. Check the [main README](../README.md)
2. Review component documentation
3. Test API endpoints at `/api/health`
4. Check browser console for errors
5. Create issue with detailed description

---

**Built with ❤️ using Next.js and modern web technologies**