const MAX = 100000000

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  empty() {
    return this.heap.length === 0
  }

  // Helper Methods
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)].value;
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)].value;
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)].value;
  }

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  peek() {
    if (this.heap.length === 0) {
      return null;
    }
    return this.heap[0];
  }

  remove() {
    if (this.heap.length === 0) {
      return null;
    }
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index) < this.heap[index].value) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index) > this.leftChild(index)) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index].value > this.heap[smallerChildIndex].value) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const generate = (req, res) => {
  try {
    const numNode = req.body.numNode;
    const numEdge = req.body.numEdge;
    const weight = req.body.weight;
    const graphMode = req.body.graphMode;
    let Count = 0;
    let fullEdge = [];
    for (let i = 0; i < numNode; ++i) {
      for (let j = graphMode === "undirected" ? i + 1 : 0; j < numNode; ++j) {
        if (i !== j) {
          fullEdge.push({
            id: ++Count,
            source: i + 1,
            target: j + 1,
            weight: getRndInteger(weight[0], weight[1]),
          });
        }
      }
    }
    fullEdge = shuffle(fullEdge);

    const graph = [];
    for (let i = 0; i < numEdge; ++i) {
      graph.push(fullEdge[i]);
    }
    graph.unshift({
      numNode: numNode,
      numEdge: numEdge,
      weight: weight,
      graphMode: graphMode,
    });
    res.status(200).send({
      success: true,
      message: "Success!",
      graph: graph,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const textToGraph = (req, res) => {
  try {
    const edgeMap = new Map();

    const numberArray = req.body.text.match(/\d+/g);
    let graphConfig = {
      numNode: 0,
      numEdge: 0,
      weight: [0, 0],
      graphMode: "undirected",
    };

    graphConfig.numNode = Number(numberArray[0]);
    graphConfig.numEdge = Number(numberArray[1]);
    graphConfig.graphMode =
      Number(numberArray[2]) === 0 ? "undirected" : "directed";

    const graph = [];
    let numEdge = 0;

    for (let i = 3; i < numberArray.length; i = i + 3) {
      graph.push({
        source: Number(numberArray[i]),
        target: Number(numberArray[i + 1]),
        weight: Number(numberArray[i + 2]),
      });
      if (graphConfig.graphMode === "undirected") {
        if (
          edgeMap.get(
            `${Math.max(
              Number(numberArray[i]),
              Number(numberArray[i + 1])
            )}-${Math.min(Number(numberArray[i]), Number(numberArray[i + 1]))}`
          ) !== undefined
        ) {
          return res.status(200).send({
            success: false,
            message: `Line ${graph.length}: Graph Mode is Undirected`,
          });
        } else {
          edgeMap.set(
            `${Math.max(
              Number(numberArray[i]),
              Number(numberArray[i + 1])
            )}-${Math.min(Number(numberArray[i]), Number(numberArray[i + 1]))}`,
            1
          );
        }
      }
      if (Number(numberArray[i]) > graphConfig.numNode) {
        return res.status(200).send({
          success: false,
          message: `Line ${graph.length}: Source Node is invalid`,
        });
      }
      if (Number(numberArray[i + 1]) > graphConfig.numNode) {
        return res.status(200).send({
          success: false,
          message: `Line ${graph.length}: Target Node is invalid`,
        });
      }
      numEdge = numEdge + 1;
      graphConfig.weight[0] = Math.min(
        graphConfig.weight[0],
        Number(numberArray[i + 2])
      );
      graphConfig.weight[1] = Math.max(
        graphConfig.weight[1],
        Number(numberArray[i + 2])
      );
    }

    if (numEdge !== graphConfig.numEdge) {
      return res.status(200).send({
        success: false,
        message: `Line ${graph.length}: Number of Edge is invalid`,
      });
    }

    graph.unshift(graphConfig);
    res.status(200).send({
      success: true,
      graph: graph,
      message: "Success!",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const pathfinding = (req, res) => {
  if (req.body.algorithm === 'dijkstra') {
    if (req.body.source === 0) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Source'
      })
    }
  }
  if (req.body.algorithm === 'bellman') {
    if (req.body.source === 0) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Source'
      })
    }
  }

  const graphData = req.body.graphData

  if (req.body.algorithm === 'dijkstra') {
    // tạo danh sách kề
    const adj = []
    for (let i = 0; i < graphData[0].numNode; ++i) adj.push([])
    for (let i = 1; i < graphData.length; ++i) {
      adj[graphData[i].source - 1].push({
        target: graphData[i].target - 1,
        weight: graphData[i].weight
      })
      if (graphData[0].graphMode === 'undirected') {
        adj[graphData[i].target - 1].push({
          target: graphData[i].source - 1,
          weight: graphData[i].weight
        })
      }
    }

    let dist = new Array(graphData[0].numNode)
    let parent = new Array(graphData[0].numNode)
    dist.fill(MAX)
    parent.fill(-1)
    dist[req.body.source - 1] = 0;

    const pq = new PriorityQueue()
    pq.add({
      node: req.body.source - 1,
      value: dist[req.body.source - 1]
    })

    while (!pq.empty()) {
      let u = pq.peek()
      pq.remove()
      if (dist[u.node] !== u.value) continue
      for (let i = 0; i < adj[u.node].length; ++i) {
        let v = adj[u.node][i].target
        if (v === u.node) continue
        let w = adj[u.node][i].weight
        if (dist[v] > u.value + w) {
          dist[v] = u.value + w
          parent[v] = u.node
          pq.add({
            node: v,
            value: dist[v]
          })
        }
      }
    }

    return res.status(200).send({
      success: true,
      result: {
        distance: dist,
        trace: parent,
      },
      message: 'Success!'
    })
  }

  if (req.body.algorithm === 'bellman') {
    return res.status(200).send({
      success: false,
      message: "API Work!"
    })
  }

  if (req.body.algorithm === 'floyd') {

    const matrix = new Array(graphData[0].numNode)
    const parent = new Array(graphData[0].numNode)

    for(let i = 0; i < graphData[0].numNode; ++i) {
      matrix[i] = new Array(graphData[0].numNode)
      parent[i] = new Array(graphData[0].numNode)
      for(let j = 0; j < graphData[0].numNode; ++j) {
        matrix[i][j] = MAX
        parent[i][j] = MAX
      }
      matrix[i][i] = 0
    }

    for(let i = 1; i < graphData.length; ++i) {
      matrix[graphData[i].source - 1][graphData[i].target - 1] = graphData[i].weight
      parent[graphData[i].source - 1][graphData[i].target - 1] = graphData[i].target
      if(graphData[0].graphMode === 'undirected') {
        matrix[graphData[i].target - 1][graphData[i].source - 1] = graphData[i].weight
        parent[graphData[i].target - 1][graphData[i].source - 1] = graphData[i].source
      }
    }

    for(let k = 0; k < graphData[0].numNode; ++k)
    for(let i = 0; i < graphData[0].numNode; ++i)
    for(let j = 0; j < graphData[0].numNode; ++j) 
    if(matrix[i][j] > matrix[i][k] + matrix[k][j]) {
      matrix[i][j] = matrix[i][k] + matrix[k][j]
      parent[i][j] = parent[i][k]
    }

    return res.status(200).send({
      success: true,
      result: {
        distance: matrix,
        trace: parent,
      },
      message: "Success!"
    })
  }
}

const tracePath = (req, res) => {
  const algorithm = req.body.result.algorithm
  const distance = req.body.result.result.distance
  const parent = req.body.result.result.trace
  const sourceNode = req.body.node.sourceNode - 1
  const targetNode = req.body.node.targetNode - 1
  const data = req.body.data

  if(algorithm === 'dijkstra') {
    if(distance[targetNode] === MAX) {
      return res.status(200).send({
        success: false,
        message: 'NOT FOUND PATH'
      })
    } else {
      let node = []
      let currentNode = targetNode

      while(currentNode !== -1) {
        node.unshift(currentNode + 1)
        currentNode = parent[currentNode]
      }

      const edgeMap = new Map()
      for(let i = 0; i < node.length - 1; ++i) {
        edgeMap.set(`${node[i]}-${node[i + 1]}`, 1)
        if(data[0].graphMode === 'undirected') {
          edgeMap.set(`${node[i + 1]}-${node[i]}`, 1)
        }
      }

      let edge = []
      for(let i = 1; i < data.length; ++i) {
        if(edgeMap.get(`${data[i].source}-${data[i].target}`) !== undefined ) edge.push(data[i].id)
      }

      return res.status(200).send({
        success: true,
        distance: distance[targetNode],
        node: node,
        edge: edge
      })
    }
  }

  res.status(200).send({
    success: false,
    message: 'API WORK'
  })
}

module.exports = {
  generate,
  textToGraph,
  pathfinding,
  tracePath
};
