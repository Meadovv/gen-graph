import {
    DownloadOutlined,
    UploadOutlined,
    CloudUploadOutlined,
    CloseCircleOutlined
} from '@ant-design/icons'
import {
    Space, Button, Modal, Form, Radio, Upload, Input, message
} from 'antd'
import { useState } from 'react'

function ImportModal({ open, onCancel, importData }) {

    const defaultData = {
        graph_mode: 'undirected',
        fileName: 'no_file',
        file: '',
        data_type: 'wm'
    }

    const [data, setData] = useState(defaultData)

    const handleFile = (file) => {
        const fileReader = new FileReader()
        fileReader.readAsText(file)
        fileReader.onload = (e) => {
            setData({
                ...data,
                fileName: file.name,
                file: e.target.result
            })
        }
    }

    return (
        <Modal
            forceRender
            open={open}
            okText='Import'
            onCancel={onCancel}
            okButtonProps={{
                type: 'primary',
                size: 'large'
            }}
            cancelButtonProps={{
                type: 'primary',
                size: 'large'
            }}
            onOk={() => {
                importData(data)
                setData(defaultData)
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        marginRight: 20,
                        fontWeight: 'bold'
                    }}>Graph Mode: </div>
                    <Radio.Group value={data.graph_mode} onChange={(event) => {
                        setData({
                            ...data,
                            graph_mode: event.target.value
                        })
                    }}>
                        <Radio value='undirected'>Undirected</Radio>
                        <Radio value='directed'>Directed</Radio>
                    </Radio.Group>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                    <div style={{
                        marginRight: 20,
                        fontWeight: 'bold'
                    }}>Data Type: </div>
                    <Radio.Group value={data.data_type} onChange={(event) => {
                        setData({
                            ...data,
                            data_type: event.target.value
                        })
                    }}>
                        <Radio value='wm'>Weight Matrix</Radio>
                        <Radio value='al'>Adjacency List</Radio>
                    </Radio.Group>
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    {
                        data.fileName === 'no_file' ?
                            <Upload
                                beforeUpload={(file) => {
                                    handleFile(file)
                                    return false
                                }}
                                showUploadList={false}
                            >
                                <Button size='large' type='primary' ghost icon={<CloudUploadOutlined />} >Click to Upload</Button>
                            </Upload> :
                            <div style={{
                                display: 'flex'
                            }}>
                                <div style={{
                                    fontSize: 20
                                }}>File: {data.fileName}</div>
                                <CloseCircleOutlined style={{
                                    marginLeft: 20,
                                    fontSize: 20,
                                    color: '#AA0000'
                                }} onClick={() => {
                                    setData({
                                        ...data,
                                        fileName: 'no_file'
                                    })
                                }} />
                            </div>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default function FilePanel({ setData, active }) {

    const [openModal, setOpenModal] = useState(false)

    const importData = (values) => {
        console.log(values)
        setOpenModal(false)
    }

    const handleExport = () => {
        let fileContent = "data:text/txt;charset=utf-8,"
        const link = document.createElement('a')
        link.href = fileContent + localStorage.getItem('textData')
        link.download = 'graph.txt'
        link.click()
    }

    return (
        <div style={{
            display: active ? 'flex' : 'none',
            justifyContent: 'space-between'
        }}>
            <ImportModal
                open={openModal}
                onCancel={() => {
                    setOpenModal(false)
                }}
                importData={importData}
            />
            <Space>
                <Button type='primary' size='large' icon={<UploadOutlined />} onClick={() => { setOpenModal(true) }}>Import</Button>
                <Button type='primary' size='large' icon={<DownloadOutlined />} onClick={handleExport}>Export</Button>
            </Space>
        </div>
    )
}