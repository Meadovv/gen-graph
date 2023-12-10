import { useState } from "react";
import Config from "../../Components/Config/Config";
import Layout from "../../Components/Layout/Layout";
import GraphView from "../../Components/Graph/GraphView";

export default function Home() {

    const [data, setData] = useState([
        {
            numNode: 0,
            numEdge: 0,
            graph_mode: 'undirected'
        }
    ])

    return (
        <Layout>
            <Config data={data} setData={setData} />
            <GraphView data={data} />
        </Layout>
    )
}