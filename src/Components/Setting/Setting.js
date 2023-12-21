import { 
    Menu, 
} from 'antd'
import {
    SettingOutlined,
    DatabaseOutlined,
    FolderAddOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import ConfigPanel from './Panel/ConfigPanel'
import DataPanel from './Panel/DataPanel'
import FilePanel from './Panel/FilePanel'

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
            width: '100%'
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
                padding: 5,
                width: '100%'
            }}>
                <ConfigPanel active={currentMenu === configMenuItems[0].key} setData={setData}/>
                <DataPanel active={currentMenu === configMenuItems[1].key} data={data} setData={setData} setDisableMenu={setDisableMenu} />
                <FilePanel active={currentMenu === configMenuItems[2].key} data={data} setData={setData} />
            </div>
        </div>
    )
}