import { Select, Button, Collapse, message } from 'antd'
import { useEffect, useState } from 'react'

const options = [
    {
        label: 'Dijkstra',
        value: 'dijkstra'
    },
    {
        label: 'Bellman Ford',
        value: 'bellman'
    },
    {
        label: 'Floyd Warshall',
        value: 'floyd'
    }
]

export default function AdvancedPanel({ data, active }) {

    const [algorithm, setAlgorithm] = useState(options[2].value)
    const [nodeList, setNodeList] = useState([])
    const [source, setSource] = useState(1)
    const [collapseItem, setCollapseItem] = useState([])

    useEffect(() => {
        setCollapseItem([])
        let backup = []
        for (let i = 1; i <= data[0].numNode; ++i) backup.push({
            label: `Node ${i}`,
            value: i
        })
        setNodeList(backup)
    }, [data])

    const Dijkstra = () => {
        let distance = []
        let parent = new Map()
        let adj = []
        for(let i = 0; i <= data[0].numNode; ++i) adj.push([])
        for(let i = 1; i < data.length; ++i) {
            adj[data[i].from].push({to: data[i].to, weight: data[i].weight})
            if(data[0].graph_mode === 'undirected') {
                adj[data[i].to].push({to: data[i].from, weight: data[i].weight})
            }
        }

        for(let i = 0; i <= data[0].numNode; ++i) distance[i] = (i === source ? 0 : 1000000)

        let nodeQueue = []
        nodeQueue.push({
            node: source,
            distance: distance[source]
        })

        while(nodeQueue.length > 0) {
            let maxElement = -1
            let maxIndex = -1
            for(let i = 0; i < nodeQueue.length; ++i) {
                if(maxElement < nodeQueue[i].distance) {
                    maxElement = nodeQueue[i].distance
                    maxIndex = i
                }
            }
            let maxNode = nodeQueue[maxIndex]
            nodeQueue.splice(maxIndex, 1)

            if(maxNode.distance !== distance[maxNode.node]) continue

            for(let i = 0; i < adj[maxNode.node].length; ++i) {
                if(adj[maxNode.node][i].to === maxNode.node) continue
                if(distance[adj[maxNode.node][i].to] > maxNode.distance + adj[maxNode.node][i].weight) {
                    distance[adj[maxNode.node][i].to] = maxNode.distance + adj[maxNode.node][i].weight
                    parent.set(adj[maxNode.node][i].to, maxNode.node)
                    nodeQueue.push({
                        node: adj[maxNode.node][i].to,
                        distance: distance[adj[maxNode.node][i].to]
                    })
                }
            }
        }

        let collapseTemp = []

        for(let i = 1; i < distance.length; ++i) {
            if(distance[i] > 100000) {
                collapseTemp.push({
                    key: i,
                    label: `There is no path from Node ${source} to Node ${i}`,
                    children: null
                })
            } else {

                let text = `Path: ${source}`
                let trace = []

                let currentNode = i
                while(parent.get(currentNode) !== undefined) {
                    trace.push(currentNode)
                    currentNode = parent.get(currentNode)
                }

                console.log(trace)

                while(trace.length > 0) {
                    text = text + ` > ${trace[trace.length - 1]}`
                    trace.pop()
                }

                collapseTemp.push({
                    key: i,
                    label: `Distance from Node ${source} to Node ${i} is ${distance[i]}`,
                    children: text
                })
            }
        }

        setCollapseItem(collapseTemp)
    }

    const BellmanFord = () => {

    }

    const FloydWarshall = () => {

    }

    const executeAlgorithm = () => {
        if(algorithm === 'dijkstra') Dijkstra()
        if(algorithm === 'bellman') BellmanFord()
        if(algorithm === 'floyd') FloydWarshall()
        message.success('Success!')
    }

    return (
        <div style={{
            display: active ? 'flex' : 'none',
            flexDirection: 'column',
            marginTop: 10
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div>Pathfinding Algorithm</div>
                <Select style={{ width: '30%' }} options={options} value={algorithm} onChange={(value) => { setAlgorithm(value) }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
                <div>Source Node</div>
                <Select style={{ width: '30%' }} options={nodeList} value={source} onChange={(value) => { setSource(value) }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 20 }}>
                <Button type='primary' size='large' danger onClick={executeAlgorithm}>Find</Button>
            </div>

            <h3>Result</h3>
            <Collapse items={collapseItem} />
        </div>
    )
}