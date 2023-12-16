import { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";

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

export default function GraphView({ data }) {
  const graphRef = useRef();

  const [graphData, setGraphData] = useState({
    nodes: [],
    links: []
  })

  useEffect(() => {
    let nodes = Array.from({length: data[0].numNode}, (_, index) => ({
      id: index + 1,
      label: `${index + 1}`
    }))
    let links = []
    data.forEach((item, index) => {
      if(!index) return
      links.push({
        source: item.source,
        target: item.target,
        weight: item.weight
      })
    })

    const graphDataTemp = {
      nodes: nodes,
      links: links
    }

    setGraphData(graphDataTemp)
  }, [data])

  const nodeConfig = {
    nodeCanvasObject: (node, ctx, globalScale) => {
      // Draw a blue circle
      ctx.fillStyle = "#00308F"
      ctx.beginPath()
      ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false)
      ctx.fill()

      // Draw the node label inside the circle
      ctx.font = `${16 / globalScale}px Sans-Serif`
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.label, node.x, node.y)
    },
  }

  const linkConfig = {
    linkCanvasObject: (edge, ctx, globalScale) => {

      // Set the edge stroke style with the calculated color
      ctx.strokeStyle = '#72A0C1'
    
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
      ctx.fillStyle = '#72A0C1'

      if(data[0].graphMode === 'directed') ctx.fill()

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
      cooldownTicks={100}
      onEngineStop={() => graphRef.current.zoomToFit(0, 50)}
    />
  );
}
