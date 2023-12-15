import { useState } from "react";
import Setting from "../../Components/Setting/Setting";
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

    return (
        <Layout>
            <Setting data={data} setData={setData} />
            <GraphView data={data} />
        </Layout>
    )
}