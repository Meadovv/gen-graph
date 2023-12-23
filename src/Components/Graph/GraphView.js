import { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { message } from 'antd'
import axios from 'axios'

function findPointC(a, b, distance) {
  const xMid = (a.x + b.x) / 2, yMid = (a.y + b.y) / 2
  const dx = b.x - a.x, dy = b.y - a.y
  const lengthAB = Math.sqrt(dx * dx + dy * dy)
  const xC = xMid + (distance / lengthAB) * (b.y - a.y), yC = yMid - (distance / lengthAB) * (b.x - a.x)
  return {
    x: xC,
    y: yC
  }
}

export default function GraphView({ data, sourceNode, setSourceNode, result, traceInformation, setTraceInformation }) {
  const graphRef = useRef();

  const [targetNode, setTargetNode] = useState(0)

  const [clickCount, setClickCount] = useState(0)

  const getTrace = async () => {
    if(!sourceNode || !targetNode) return
    await axios.post('/graph/trace',
    {
      data: data,
      result: result,
      node: {
        sourceNode: sourceNode,
        targetNode: targetNode,
      }
    }).then(res => {
      if(res.data.success) {
        setTraceInformation({
          distance: res.data.distance,
          node: res.data.node,
          edge: res.data.edge
        })
      } else {
        message.error(res.data.message)
        setTraceInformation({
          distance: 0,
          edge: [],
          node: []
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(result.algorithm !== 'floyd') {
      setTargetNode(0)
      setTraceInformation({
        distance: 0,
        edge: [],
        node: []
      })
    }
  }, [sourceNode])

  useEffect(() => {
    getTrace()
  }, [sourceNode, targetNode])

  const [graphData, setGraphData] = useState({
    nodes: [],
    links: []
  })

  useEffect(() => {
    let nodes = Array.from({ length: data[0].numNode }, (_, index) => ({
      id: index + 1,
      label: `${index + 1}`
    }))
    let links = []
    data.forEach((item, index) => {
      if (!index) return
      links.push({
        id: item.id,
        source: item.source,
        target: item.target,
        weight: item.weight
      })
    })

    const graphDataTemp = {
      nodes: nodes,
      links: links
    }

    setSourceNode(0)
    setTargetNode(0)
    setGraphData(graphDataTemp)
  }, [data])

  const nodeConfig = {
    nodeCanvasObject: (node, ctx, globalScale) => {
      // Draw a blue circle
    
      if(node.id !== sourceNode && node.id !== targetNode && traceInformation.node.indexOf(node.id) !==  -1) {
        ctx.fillStyle = '#FF7F50'
      } else {
        ctx.fillStyle = (
          node.id === sourceNode ? "#006A4E" : 
          (node.id === targetNode ? 
            "#AA0000" : 
            "#00308F")
          )
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false)
      ctx.fill()

      // Draw the node label inside the circle
      ctx.font = `${16 / globalScale}px Sans-Serif`
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const label = node.id === sourceNode ? `${node.id} (S)` :
        node.id === targetNode ? `${node.id} (T)` :
          traceInformation.node.indexOf(node.id) !== -1 ? `${node.id} (${traceInformation.node.indexOf(node.id) + 1})` : `${node.id}`

      ctx.fillText(label, node.x, node.y)
    },
  }

  const linkConfig = {
    linkCanvasObject: (edge, ctx, globalScale) => {

      // Set the edge stroke style with the calculated color
      ctx.strokeStyle = (traceInformation.edge.indexOf(edge.id) !== -1 ? '#FF4500' : '#72A0C1')

      // Start the path
      ctx.beginPath()



      // Draw the edge as a straight line between source and target nodes
      ctx.moveTo(edge.source.x, edge.source.y)
      ctx.lineTo(edge.target.x, edge.target.y)

      // Set the edge width
      ctx.lineWidth = 1

      // Close the path
      ctx.closePath()

      // Stroke the path to draw the edge
      ctx.stroke()

      const arrowSize = 6
      const spaceBetweenArrowAndNode = 1
      const angle = Math.atan2(edge.target.y - edge.source.y, edge.target.x - edge.source.x)
      const arrowX = edge.target.x - (arrowSize + spaceBetweenArrowAndNode) * Math.cos(angle)
      const arrowY = edge.target.y - (arrowSize + spaceBetweenArrowAndNode) * Math.sin(angle)

      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
        arrowY - arrowSize * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
        arrowY - arrowSize * Math.sin(angle + Math.PI / 6)
      );
      ctx.fillStyle = (traceInformation.edge.indexOf(edge.id) !== -1 ? '#FF4500' : '#72A0C1')

      if (data[0].graphMode === 'directed') ctx.fill()

      const c_prime = findPointC(edge.source, edge.target, 3)

      // Set text font size and style
      ctx.font = `${16 / globalScale}px Sans-Serif`
      ctx.fillStyle = 'black' // adjust color as needed
      ctx.textAlign = 'center'


      // Draw the edge label at the calculated position
      ctx.fillText(`${edge.weight}`, c_prime.x, c_prime.y)

    },
  };

  const graphConfig = {
    graphData: graphData,
    width: window.innerWidth,
    height: window.innerHeight,
    centerAt: [window.innerWidth / 2, window.innerHeight / 2],
  };

  return (
    <ForceGraph2D
      ref={graphRef}
      {...graphConfig}
      {...nodeConfig}
      {...linkConfig}
      cooldownTicks={0}
      // onEngineStop={() => graphRef.current.zoomToFit(0, 50)}
      onNodeClick={(node) => {
        if(result && sourceNode) {
          if(result.algorithm !== 'floyd') {
            if(node.id === sourceNode) {
              message.error('Unable to select node')
            } else {
              setTargetNode(node.id)
            }
          } else {
            if(clickCount % 2 === 0) {
              setSourceNode(node.id)
            } else {
              setTargetNode(node.id)
            }
            setClickCount(current => current + 1)
          }
        } else {
          message.error('Execute Algorithm First')
        }
      }}
    />
  );
}
