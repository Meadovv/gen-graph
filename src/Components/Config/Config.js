import { 
    Menu, 
    Space, 
    Button, 
    message 
} from 'antd'
import {
    SettingOutlined,
    DatabaseOutlined,
    FolderAddOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import SettingPanel from './Panel/SettingPanel'
import DataPanel from './Panel/DataPanel'
import FilePanel from './Panel/FilePanel'
import AdvancedPanel from './Panel/AdvancedPanel'
import axios from 'axios';

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

export default function Config({ data, setData }) {

    const [currentMenu, setCurrentMenu] = useState(configMenuItems[0].key)
    const [loading, setLoading] = useState(false)
    const [disableMenu, setDisableMenu] = useState(false)

    const onChangeMenu = (value) => {
        setCurrentMenu(value.key)
    }

    const Generate = () => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_SERVER_HOST}/graph/generate`,
        {
            numNode: data[0].numNode,
            numEdge: data[0].numEdge,
            weight: data[0].weight,
            graphMode: data[0].graphMode
        }).then(res => {
            if(res.data.success) {
                setData(res.data.graph)
            } else {
                message.error(res.data.message)
            }
        }).catch(err => {
            console.log(err)
            message(err.message)
        })
        setLoading(false)
        setCurrentMenu(configMenuItems[1].key)
    }

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
                <SettingPanel active={currentMenu === configMenuItems[0].key} data={data} setData={setData}/>
                <DataPanel active={currentMenu === configMenuItems[1].key} data={data} setData={setData} setDisableMenu={setDisableMenu} />
                <FilePanel active={currentMenu === configMenuItems[2].key} data={data} setData={setData} />
                <AdvancedPanel active={currentMenu === configMenuItems[3].key} data={data} />
            </div>
            <Space style={{ display: currentMenu === configMenuItems[0].key ? '' : 'none' }}>
                <Button type='primary' size='large' onClick={() => {
                    setData('default')
                }}>Reset</Button>
                <Button loading={loading} type='primary' size='large' danger onClick={Generate}>Generate</Button>
            </Space>
        </div>
    )
}