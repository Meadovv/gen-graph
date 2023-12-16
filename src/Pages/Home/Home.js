import { useState } from "react";
import Setting from "../../Components/Setting/Setting";
import Layout from "../../Components/Layout/Layout";
import GraphView from "../../Components/Graph/GraphView";
import { FloatButton, Drawer } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const defaultData = [
  {
    numNode: 5,
    numEdge: 5,
    weight: [5, 10],
    graphMode: "undirected",
  },
];

export default function Home() {
  const [data, setData] = useState(defaultData)

  const [openDrawer, setOpenDrawer] = useState(false)

  const closeDrawer = () => {
      setOpenDrawer(false)
  }

  return (
    <Layout>
      <FloatButton
        icon={<SettingOutlined />}
        onClick={() => {
          setOpenDrawer(true);
        }}
      />
      <Drawer
        title="Setting"
        placement="right"
        size="large"
        onClose={closeDrawer}
        open={openDrawer}
      >
        <Setting data={data} setData={setData} />
      </Drawer>
      <GraphView data={data} />
    </Layout>
  );
}
