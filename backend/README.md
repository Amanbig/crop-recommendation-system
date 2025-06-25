# 🚀 Crop Recommendation Backend

A FastAPI-powered backend service that provides machine learning-based crop recommendations using soil and environmental parameters.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Docker Usage](#docker-usage)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)

## 🔍 Overview

This backend service is the core engine of the Crop Recommendation System. It leverages machine learning models trained on agricultural data to provide intelligent crop recommendations based on soil nutrient levels and environmental conditions.

The service is built with FastAPI, providing high-performance, async API endpoints with automatic interactive documentation.

## ✨ Features

- **Machine Learning Predictions**: XGBoost and Scikit-learn powered crop recommendations
- **Fast API Performance**: Async FastAPI framework for high-throughput requests
- **Interactive Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Data Management**: Efficient handling of agricultural datasets
- **Jupyter Notebook Integration**: Seamless notebook viewing and analysis
- **CORS Support**: Cross-origin resource sharing for web applications
- **Health Monitoring**: Built-in health check endpoints
- **Error Handling**: Comprehensive error handling with meaningful responses

## 🛠 Technology Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.11**: Core programming language
- **Scikit-learn**: Machine learning library for model training
- **XGBoost**: Gradient boosting framework for enhanced predictions
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing support
- **Matplotlib**: Data visualization (for notebook outputs)
- **Uvicorn**: ASGI server for production deployment
- **Pydantic**: Data validation using Python type annotations
- **NBFormat**: Jupyter notebook format handling

## 📋 Prerequisites

- Python 3.11 or higher
- pip (Python package installer)
- Virtual environment (recommended)
- Docker (optional, for containerized deployment)

## 🚀 Installation

### Local Development Setup

1. **Clone the repository and navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**:
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On Linux/macOS:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Verify installation**:
   ```bash
   python -c "import fastapi, sklearn, xgboost, pandas; print('All dependencies installed successfully!')"
   ```

### Docker Setup

1. **Build Docker image**:
   ```bash
   docker build -t crop-recommendation-backend .
   ```

2. **Run container**:
   ```bash
   docker run -p 8000:8000 crop-recommendation-backend
   ```

## 🎯 Usage

### Starting the Development Server

```bash
# Start with auto-reload for development
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000

# Or using FastAPI CLI (if installed)
fastapi dev app.py
```

### Starting the Production Server

```bash
# Production deployment
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will start at `http://localhost:8000`

### Interactive API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 📚 API Endpoints

### Health Check
```http
GET /
```
Basic health check endpoint.

### Get Crop Labels
```http
GET /labels
```

**Response**:
```json
{
  "labels": ["rice", "maize", "chickpea", ...],
  "images": {
    "rice": "https://example.com/rice.jpg",
    "maize": "https://example.com/maize.jpg"
  }
}
```

### Get Dataset
```http
GET /data?page=1&size=100
```

**Parameters**:
- `page` (int): Page number (default: 1, min: 1)
- `size` (int): Items per page (default: 10, min: 1, max: 100)

**Response**:
```json
{
  "page": 1,
  "size": 100,
  "total_records": 2200,
  "total_pages": 22,
  "data": [
    {
      "N": 90,
      "P": 42,
      "K": 43,
      "temperature": 20.879,
      "humidity": 82.002,
      "ph": 6.502,
      "rainfall": 202.935,
      "label": "rice"
    }
  ]
}
```

### Make Prediction
```http
POST /predict
Content-Type: application/json
```

**Request Body**:
```json
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

**Response**:
```json
{
  "prediction": "rice",
  "image": "https://example.com/rice.jpg"
}
```

### Get Jupyter Notebook
```http
GET /notebook
```

Returns the complete Jupyter notebook in JSON format for frontend rendering.

## 📁 Project Structure

```
backend/
├── app.py                    # Main FastAPI application
├── requirements.txt          # Python dependencies
├── Dockerfile               # Docker configuration
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── model/
│   └── model.pkl           # Trained ML model
├── dataset/
│   └── Crop_recommendation.csv  # Training dataset
├── notebook/
│   └── crop-recommendation-system.ipynb  # Jupyter notebook
└── constants/
    └── constant.py         # Application constants (image links, etc.)
```

## 🐳 Docker Usage

### Building the Image

```bash
# Build from Dockerfile
docker build -t crop-recommendation-backend .

# Build with custom tag
docker build -t crop-backend:v1.0.0 .
```

### Running the Container

```bash
# Basic run
docker run -p 8000:8000 crop-recommendation-backend

# Run with environment variables
docker run -p 8000:8000 -e PYTHONUNBUFFERED=1 crop-recommendation-backend

# Run in detached mode
docker run -d -p 8000:8000 --name crop-backend crop-recommendation-backend
```

### Docker Compose

```bash
# Start with docker-compose (from root directory)
docker-compose up backend

# Build and start
docker-compose up --build backend
```

## 💻 Development

### Code Style

- Follow PEP 8 Python style guidelines
- Use type hints for function parameters and return values
- Document functions and classes with docstrings
- Keep functions focused and modular

### Adding New Endpoints

1. **Define Pydantic models** for request/response:
   ```python
   from pydantic import BaseModel
   
   class NewRequest(BaseModel):
       field1: str
       field2: int
   ```

2. **Add endpoint to app.py**:
   ```python
   @app.post("/new-endpoint")
   def new_endpoint(request: NewRequest):
       # Process request
       return {"result": "success"}
   ```

3. **Update CORS origins** if needed
4. **Test the endpoint** using the interactive docs

### Environment Variables

```bash
# Development
export PYTHONPATH=/path/to/backend
export PYTHONUNBUFFERED=1

# Production
export WORKERS=4
export HOST=0.0.0.0
export PORT=8000
```

### Logging

The application uses Python's built-in logging. To enable debug logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 🧪 Testing

### Manual Testing

1. **Start the server**:
   ```bash
   python -m uvicorn app:app --reload
   ```

2. **Test endpoints**:
   ```bash
   # Test health check
   curl http://localhost:8000/
   
   # Test labels endpoint
   curl http://localhost:8000/labels
   
   # Test prediction
   curl -X POST "http://localhost:8000/predict" \
        -H "Content-Type: application/json" \
        -d '{"N":90,"P":42,"K":43,"temperature":20.8,"humidity":82.0,"ph":6.5,"rainfall":202.9}'
   ```

### Using Interactive Documentation

1. Navigate to http://localhost:8000/docs
2. Click on any endpoint to expand
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

## 🔧 Troubleshooting

### Common Issues

1. **Import Errors**:
   ```bash
   # Ensure all dependencies are installed
   pip install -r requirements.txt
   
   # Check Python path
   echo $PYTHONPATH
   ```

2. **Port Already in Use**:
   ```bash
   # Find process using port 8000
   lsof -i :8000
   
   # Kill the process
   kill -9 <PID>
   
   # Or use different port
   uvicorn app:app --port 8001
   ```

3. **Model Loading Issues**:
   ```bash
   # Verify model file exists
   ls -la model/model.pkl
   
   # Check model format
   python -c "import pickle; pickle.load(open('model/model.pkl', 'rb'))"
   ```

4. **CORS Issues**:
   - Ensure frontend URL is added to `origins` list in app.py
   - Check browser console for CORS errors
   - Verify preflight requests are handled

### Performance Optimization

1. **Use multiple workers**:
   ```bash
   uvicorn app:app --workers 4
   ```

2. **Enable production optimizations**:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4 --access-log
   ```

3. **Monitor memory usage**:
   ```bash
   # Check memory usage
   docker stats crop-backend
   ```

## 🤝 Contributing

1. **Create feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes following code style**
3. **Test your changes**:
   ```bash
   python -m uvicorn app:app --reload
   # Test endpoints manually or with curl
   ```

4. **Update documentation** if needed
5. **Submit pull request**

### Code Review Checklist

- [ ] Code follows PEP 8 style guidelines
- [ ] New endpoints are documented
- [ ] Error handling is implemented
- [ ] Type hints are used
- [ ] CORS is properly configured
- [ ] Pydantic models are defined for requests/responses

## 📞 Support

For questions and support:

1. Check the [main README](../README.md)
2. Review API documentation at `/docs`
3. Check existing issues and solutions
4. Create new issue with detailed description

---

**Made with ❤️ using FastAPI and Machine Learning**