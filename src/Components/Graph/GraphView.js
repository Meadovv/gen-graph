import { Graphviz } from 'graphviz-react';
import { useEffect, useState } from 'react';

export default function GraphView({ data }) {

    const graphOptions = {
        fit: false,
        zoom: true
    }

    const [dots, setDot] = useState(`graph {
    }`)

    useEffect(() => {
        let edgeArray = ''
        for(let i = 1; i < data.length; ++i) {
            edgeArray += `${data[i].from} -${data[0].graphMode === 'undirected' ? '-' : '>'} ${data[i].to} [label = ${data[i].weight}, color = black];`
        }
        let backupDots = `${data[0].graphMode === 'undirected' ? 'graph' : 'digraph'} {
            ${edgeArray}
        }`
        setDot(backupDots)
    }, [data])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            height: '80vh',
            width: '60%',
            padding: 10,
            borderRadius: 10,
            border: '1px solid black',
        }}>
            <Graphviz
                options={graphOptions} 
                dot={dots}
            />
        </div>
    )
}