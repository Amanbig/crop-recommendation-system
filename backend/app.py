import pickle as pkl
import nbformat
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
]


class PredictionRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

labels = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
          'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
          'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
          'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/labels")
def get_labels():
    return labels
    

@app.get("/data")
def get_csv(page: int = Query(1, ge=1), size: int = Query(10, ge=1, le=100)):
    df = pd.read_csv("./dataset/Crop_recommendation.csv")
    
    # Calculate start and end indices
    start = (page - 1) * size
    end = start + size

    # Convert to list of dicts for JSON response
    data = df.iloc[start:end].to_dict(orient="records")

    return {
        "page": page,
        "size": size,
        "total_records": len(df),
        "total_pages": (len(df) + size - 1) // size,  # ceiling division
        "data": data
    }


@app.get("/notebook")
def get_notebook():
    # Open and parse the notebook using nbformat
    with open("./notebook/crop-recommendation-system.ipynb", "r", encoding="utf-8") as f:
        notebook = nbformat.read(f, as_version=4)
    return notebook.dict()  # Return as JSON

@app.post("/predict")
def predict(params: PredictionRequest):
    # Load the model
    with open("./model/model.pkl", "rb") as f:
        model = pkl.load(f)

    input_data = [list(params.dict().values())]

    # Make prediction
    prediction = model.predict(input_data)

    return {"prediction": labels[prediction[0]]}
