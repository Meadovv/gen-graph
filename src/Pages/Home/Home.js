import { useEffect, useState } from "react";
import Setting from "../../Components/Setting/Setting";
import Layout from "../../Components/Layout/Layout";
import GraphView from "../../Components/Graph/GraphView";
import { FloatButton, Drawer } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import Popup from "./Popup/Popup";

const defaultData = [
  {
    numNode: 0,
    numEdge: 0,
    weight: [5, 10],
    graphMode: "undirected",
  },
];

const algorithms = [
  {
      label: 'Bellman Ford',
      value: 'bellman'
  },
  {
      label: 'Dijkstra',
      value: 'dijkstra'
  },
  {
      label: 'Floyd Warshall',
      value: 'floyd'
  }
]

export default function Home() {
  const [data, setData] = useState(defaultData)
  const [openModal, setOpenModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  const [traceInformation, setTraceInformation] = useState({
    distance: 0,
    node: [],
    edge: []
  })

  const [sourceNode, setSourceNode] = useState(0)
  const [targetNode, setTargetNode] = useState(0)
  const [result, setResult] = useState({
    algorithm: algorithms[0].value,
    result: {
      distance: [],
      trace: []
    }
  })
  const [algorithm, setAlgorithm] = useState(algorithms[0].value)

  const closeDrawer = () => {
    setOpenDrawer(false)
  }

  useEffect(() => {
    setSourceNode(0)
    setTargetNode(0)
  }, [algorithm])

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <Layout>
      <Popup 
        openModal={openModal} 
        setOpenModal={setOpenModal}
        data={data} 
        sourceNode={sourceNode} 
        setSourceNode={setSourceNode}
        targetNode={targetNode}
        setTargetNode={setTargetNode}
        result={result}
        setResult={setResult}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        traceInformation={traceInformation}
        setTraceInformation={setTraceInformation}
      />
      <FloatButton
        icon={<SettingOutlined />}
        onClick={() => {
          setOpenDrawer(true);
        }}
        style={{
          display: openModal ? 'none' : ''
        }}
      />
      <Drawer
        title="Setting"
        placement="right"
        size="large"
        onClose={closeDrawer}
        open={openDrawer}
      >
        <Setting data={data} setData={setData} setOpenDrawer={setOpenDrawer} />
      </Drawer>
      <GraphView 
        data={data} 
        sourceNode={sourceNode} 
        setSourceNode={setSourceNode}
        targetNode={targetNode}
        setTargetNode={setTargetNode}
        result={result}
        traceInformation={traceInformation}
        setTraceInformation={setTraceInformation}
        />
    </Layout>
  );
}
