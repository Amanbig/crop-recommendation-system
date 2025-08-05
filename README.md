# 🌱 Crop Recommendation System

A comprehensive machine learning-powered web application that provides intelligent crop recommendations based on soil and environmental parameters. The system helps farmers and agricultural professionals make informed decisions about crop selection to optimize yield and sustainability.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Development Setup](#development-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Deployed at:
### Website Deployment
- [Website](https://crop-recommendation-system-iota.vercel.app/)

### Docker images
To run docker containers first we need to pull the docker images
```bash
docker pull procoder588/crop_recommendation_frontend
docker pull procoder588/crop_recommendation_backend
```

To run the containers this is the command and be sure to update your backend and frontend urls
```bash
docker run -d --name CROPBackend -p 8000:8000 --network crop -e ALLOWED_URL=<your frontend url>  procoder588/crop_recommendation_backend
docker run -d --name CROPFrontend -p 3000:3000 --network crop -e BACKEND_URL=<your backend url> procoder588/crop_recommendation_frontend
```

### Docker compose
You could also run it directly using docker compose
```bash
docker compose up -d
```


## ✨ Features

### 🎯 Core Features
- **Smart Crop Recommendations**: ML-powered predictions based on soil and environmental data
- **Interactive Dataset Viewer**: Browse and explore the training dataset
- **Jupyter Notebook Integration**: View the complete ML model development process
- **Crop Gallery**: Visual catalog of all supported crops with detailed information
- **Real-time Predictions**: Instant crop recommendations with confidence scores

### 🔧 Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Health Monitoring**: Built-in health checks for both frontend and backend
- **Docker Support**: Containerized deployment for easy scaling
- **API-First Architecture**: Clean separation between frontend and backend

## 🛠 Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.11**: Core programming language
- **Scikit-learn**: Machine learning library for model training and predictions
- **XGBoost**: Gradient boosting framework for enhanced model performance
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing library

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI component library
- **Axios**: HTTP client for API requests
- **React Markdown**: Markdown rendering for notebooks

### DevOps & Deployment
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container Docker applications
- **Uvicorn**: ASGI server for FastAPI

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   ML Model      │
│   (Next.js)     │────│   (FastAPI)     │────│   (Scikit-learn)│
│   Port: 3000    │    │   Port: 8000    │    │   (XGBoost)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────│   Docker        │──────────────┘
                        │   Network       │
                        └─────────────────┘
```

The application follows a microservices architecture:
1. **Frontend**: Next.js application serving the user interface
2. **Backend**: FastAPI server handling ML predictions and data processing
3. **ML Model**: Pre-trained models for crop recommendation

## 📋 Prerequisites

- **Docker & Docker Compose**: For containerized deployment
- **Node.js 18+**: For local frontend development
- **Python 3.11+**: For local backend development
- **Git**: For version control

## 🚀 Quick Start with Docker

The fastest way to get the application running:

```bash
# Clone the repository
git clone <repository-url>
cd crop-recommendation-system

# Start the application
docker-compose up -d

# View logs (optional)
docker-compose logs -f
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 💻 Development Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the development server
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

## 📖 Usage

### Making Crop Predictions

1. Navigate to the **Recommendation** page
2. Enter the following parameters:
   - **Nitrogen (N)**: 0-300 kg/ha
   - **Phosphorous (P)**: 0-150 kg/ha
   - **Potassium (K)**: 0-300 kg/ha
   - **Temperature**: -10 to 50°C
   - **Humidity**: 0-100%
   - **pH Level**: 0-14
   - **Rainfall**: 0-1000mm

3. Click "Get Crop Recommendation"
4. View the recommended crop with confidence score and additional information

### Exploring the Dataset

- Visit the **Dataset** page to browse the training data
- Use the "Load More" button to paginate through records
- Examine the relationship between input parameters and crop labels

### Viewing the ML Process

- Navigate to the **Notebook** page
- Explore the complete machine learning pipeline
- View code cells, outputs, and visualizations
- Toggle between light and dark themes

## 📚 API Documentation

### Base URL
- Development: `http://localhost:8000`
- Production: `https://your-domain.com/api`

### Endpoints

#### Get Crop Labels
```http
GET /labels
```
Returns all available crop labels with associated images.

#### Get Dataset
```http
GET /data?page=1&size=100
```
Retrieve paginated dataset records.

#### Make Prediction
```http
POST /predict
Content-Type: application/json

{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 20.8,
  "humidity": 82.0,
  "ph": 6.5,
  "rainfall": 202.9
}
```

#### Get Notebook
```http
GET /notebook
```
Retrieve the Jupyter notebook in JSON format.

#### Health Check
```http
GET /api/health
```
Returns service health status.

## 📁 Project Structure

```
crop-recommendation-system/
├── backend/
│   ├── app.py                 # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile            # Backend container configuration
│   ├── model/               # ML models
│   ├── dataset/             # Training data
│   ├── notebook/            # Jupyter notebooks
│   └── constants/           # Application constants
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app router
│   │   ├── components/      # React components
│   │   ├── lib/            # Utility libraries
│   │   └── types/          # TypeScript type definitions
│   ├── package.json        # Node.js dependencies
│   ├── Dockerfile          # Frontend container configuration
│   └── next.config.ts      # Next.js configuration
├── docker-compose.yml      # Multi-container configuration
└── README.md              # This file
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure Docker builds pass
- Test both frontend and backend changes

### Code Style

- **Backend**: Follow PEP 8 Python style guide
- **Frontend**: Use Prettier and ESLint configurations
- **Commits**: Use conventional commit messages

## 🔧 Environment Variables

### Backend
```env
PYTHONPATH=/app
PYTHONUNBUFFERED=1
```

### Frontend
```env
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=production
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild a specific service
docker-compose build [service-name]

# Scale services
docker-compose up --scale backend=2
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill processes on specific ports
   sudo lsof -t -i:3000 | xargs kill -9
   sudo lsof -t -i:8000 | xargs kill -9
   ```

2. **Docker Build Fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   docker-compose build --no-cache
   ```

3. **API Connection Issues**
   - Verify backend is running on port 8000
   - Check CORS settings in FastAPI
   - Ensure environment variables are set correctly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Development Team** - Initial work and ongoing maintenance

## 🙏 Acknowledgments

- Scikit-learn community for excellent ML tools
- Next.js team for the amazing React framework
- FastAPI creators for the intuitive API framework
- Open source community for various libraries and tools

---

**Happy Farming! 🚜🌾**

For more information, please visit our [documentation](docs/) or contact our support team.

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-%E2%98%95%EF%B8%8F-orange?style=for-the-badge)](https://buymeacoffee.com/amanpreet)
