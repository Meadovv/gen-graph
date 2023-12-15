import time
import random
import numpy

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Config (BaseModel):
    numNode: int
    numEdge: int
    weight: list
    graphMode: str

@app.get('/')
def home():
    return {
        'Name': 'Server'
    }

@app.post('/graph/generate')
async def crawl(payload: Config):
    try:
        baseEdgeArray = []

        # Generate Base Edge Array
        for i in range(1, payload.numNode + 1):
            for j in range(i + 1 if payload.graphMode == 'undirected' else 1, payload.numNode + 1):
                baseEdgeArray.append({
                    "from": i,
                    "to": j,
                    "weight": random.randint(payload.weight[0], payload.weight[1])
                })

        # Shuffle 
        numpy.random.shuffle(baseEdgeArray)

        # Get Some Edge
    
        graph = []
        graph.append({
            "numNode": payload.numNode,
            "numEdge": payload.numEdge,
            "weight": payload.weight,
            "graphMode": payload.graphMode
        })

        for i in range (0, payload.numEdge):
            graph.append(baseEdgeArray[i])
        
        print(payload.numNode)

        return {
            "success": True,
            "graph": graph,
            "message": "Success!"
        }
    except:
        return {
            "success": False,
            "message": "Server Busy!"
        }