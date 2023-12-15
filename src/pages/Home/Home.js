import { useState } from "react";
import Config from "../../Components/Config/Config";
import Layout from "../../Components/Layout/Layout";
import GraphView from "../../Components/Graph/GraphView";

const defaultData = [
    {
        numNode: 6,
        numEdge: 6,
        weight: [5, 10],
        graphMode: 'undirected'
    }
]

export default function Home() {

    const [data, setData] = useState(defaultData)

    const handleData = (value) => {
        if(value === 'default') {
            setData(defaultData)
        } else {
            setData(value)
        }
    }

    return (
        <Layout>
            <Config data={data} setData={handleData} />
            <GraphView data={data} />
        </Layout>
    )
}