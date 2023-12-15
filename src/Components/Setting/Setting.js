import { 
    Menu, 
} from 'antd'
import {
    SettingOutlined,
    DatabaseOutlined,
    FolderAddOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import ConfigPanel from './Panel/ConfigPanel'
import DataPanel from './Panel/DataPanel'
import FilePanel from './Panel/FilePanel'
import AdvancedPanel from './Panel/AdvancedPanel'

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

export default function Setting({ data, setData }) {

    const [currentMenu, setCurrentMenu] = useState(configMenuItems[0].key)
    const [disableMenu, setDisableMenu] = useState(false)

    const onChangeMenu = (value) => {
        setCurrentMenu(value.key)
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
                <ConfigPanel active={currentMenu === configMenuItems[0].key} data={data} setData={setData}/>
                <DataPanel active={currentMenu === configMenuItems[1].key} data={data} setData={setData} setDisableMenu={setDisableMenu} />
                <FilePanel active={currentMenu === configMenuItems[2].key} data={data} setData={setData} />
                <AdvancedPanel active={currentMenu === configMenuItems[3].key} data={data} />
            </div>
        </div>
    )
}