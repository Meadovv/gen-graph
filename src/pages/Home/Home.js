import { useState } from "react";
import Config from "../../Components/Config/Config";
import Graph from "../../Components/Graph/Graph";
import Layout from "../../Components/Layout/Layout";

export default function Home() {

    const [data, setData] = useState([
        {
            numNode: 0,
            numEdge: 0
        }
    ])

    return (
        <Layout>
            <Config data={data} setData={setData} />
            <Graph data={data} />
        </Layout>
    )
}