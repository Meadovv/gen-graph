import { Menu, Space, Button } from 'antd'
import {
    SettingOutlined,
    DatabaseOutlined,
    FolderAddOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import SettingPanel from './Panel/SettingPanel'
import DataPanel from './Panel/DataPanel'
import FilePanel from './Panel/FilePanel'
import AdvancedPanel from './Panel/AdvancedPanel'

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function getRndInteger(weight_range) {
    return Math.floor(Math.random() * (weight_range[1] - weight_range[0])) + weight_range[0];
}

const configMenuItems = [
    {
        label: 'Setting',
        key: 'setting',
        icon: <SettingOutlined />
    },
    {
        label: 'Data',
        key: 'data',
        icon: <DatabaseOutlined />
    },
    {
        label: 'File',
        key: 'file',
        icon: <FolderAddOutlined />
    },
    {
        label: 'Advanced',
        key: 'advanced',
        icon: <AppstoreOutlined />
    }
]

const defaultConfig = {
    graph_mode: 'undirected',
    num_node: 6,
    num_edge: 6,
    weight: [5, 10]
}

export default function Config({ data, setData }) {

    const [currentMenu, setCurrentMenu] = useState(configMenuItems[0].key)
    const [loading, setLoading] = useState(false)
    const [disableMenu, setDisableMenu] = useState(false)
    const [config, setConfig] = useState(defaultConfig)

    const onChangeMenu = (value) => {
        setCurrentMenu(value.key)
    }

    const Generate = () => {
        setLoading(true)
        let tempEdges = [], edges = []
        for (let u = 1; u <= config.num_node; ++u) {
            for (let v = config.graph_mode === 'directed' ? 1 : u + 1; v <= config.num_node; ++v) {
                if (u !== v) {
                    tempEdges.push({
                        from: u,
                        to: v,
                        weight: getRndInteger(config.weight)
                    })
                }
            }
        }
        tempEdges = shuffle(tempEdges)
        edges.push({
            numNode: config.num_node,
            numEdge: config.num_edge,
            graph_mode: config.graph_mode
        })
        for (let i = 1; i <= config.num_edge; ++i) {
            edges.push(tempEdges[i]);
        }
        setData(edges)
        setLoading(false)
        setCurrentMenu(configMenuItems[1].key)
    }

    useEffect(() => {
        data[0].graph_mode = config.graph_mode
    }, [config])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%'
        }}>
            <Menu
                onClick={onChangeMenu}
                selectedKeys={currentMenu}
                mode="horizontal"
                items={configMenuItems}
                disabled={disableMenu}
                style={{
                    width: '100%'
                }}
            />
            <div style={{
                padding: 10,
                width: '100%'
            }}>
                <SettingPanel active={currentMenu === configMenuItems[0].key} config={config} setConfig={setConfig} />
                <DataPanel active={currentMenu === configMenuItems[1].key} config={config} data={data} setData={setData} setDisableMenu={setDisableMenu} />
                <FilePanel active={currentMenu === configMenuItems[2].key} setData={setData} />
                <AdvancedPanel active={currentMenu === configMenuItems[3].key} config={config} setConfig={setConfig} />
            </div>
            <Space style={{ display: currentMenu === configMenuItems[0].key ? '' : 'none' }}>
                <Button type='primary' size='large' onClick={() => { setConfig(defaultConfig) }}>Reset</Button>
                <Button loading={loading} type='primary' size='large' danger onClick={Generate}>Generate</Button>
            </Space>
        </div>
    )
}