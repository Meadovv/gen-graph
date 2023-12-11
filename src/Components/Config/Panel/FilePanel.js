import {
    DownloadOutlined,
    UploadOutlined,
    CloudUploadOutlined,
    CloseCircleOutlined
} from '@ant-design/icons'
import {
    Space, Button, Modal, Radio, Upload, message
} from 'antd'
import { useState } from 'react'

function ImportModal({ open, onCancel, importData }) {

    const defaultData = {
        graph_mode: 'undirected',
        fileName: 'no_file',
        file: '',
        data_format: 'wm'
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
                    }}>Data Format: </div>
                    <Radio.Group value={data.data_format} onChange={(event) => {
                        setData({
                            ...data,
                            data_format: event.target.value
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

export default function FilePanel({ data, setData, active }) {

    const [openModal, setOpenModal] = useState(false)

    const importData = (values) => {
        const edgeMap = new Map()
        let dataArray = []
        let flag = true
        let numNode, numEdge, numItem = 0;
        const textDataArray = values.file.split(/[^\d]+/)
        for (let i = 0; i < textDataArray.length; ++i) {
            if (textDataArray[i] === '') continue
            if (isNaN(Number(textDataArray[i]))) {
                flag = false
                continue
            }
            dataArray.push(Number(textDataArray[i]))
            if (i === 0) {
                numNode = Number(textDataArray[i])
                continue
            }
            if (i === 1) {
                if (values.data_format === 'al') {
                    numEdge = Number(textDataArray[i])
                    continue
                }
            }
            numItem = numItem + 1
        }

        if (values.data_format === 'wm') {
            if (numNode * numNode !== numItem) {
                flag = false
            }
        } else {
            if (numEdge * 3 !== numItem) {
                flag = false
            }
        }

        let backupData = [{
            numNode: Number(dataArray[0]),
            numEdge: Number(dataArray[1]),
            graph_mode: values.graph_mode
        }]

        if (values.data_format === 'al') {
            for (let i = 2; i < dataArray.length; i = i + 3) {
                if(values.graph_mode === 'directed') {
                    if (edgeMap.get(`${Number(dataArray[i])}-${Number(dataArray[i + 1])}`) !== undefined) flag = false
                    else edgeMap.set(`${Number(dataArray[i])}-${Number(dataArray[i + 1])}`, Number(dataArray[i + 2]))
                } else {
                    console.log(`${Math.max(Number(dataArray[i]), Number(dataArray[i + 1]))}-${Math.min(Number(dataArray[i]), Number(dataArray[i + 1]))}`)
                    if(edgeMap.get(`${Math.max(Number(dataArray[i]), Number(dataArray[i + 1]))}-${Math.min(Number(dataArray[i]), Number(dataArray[i + 1]))}`) !== undefined) flag = false
                    else edgeMap.set(`${Math.max(Number(dataArray[i]), Number(dataArray[i + 1]))}-${Math.min(Number(dataArray[i]), Number(dataArray[i + 1]))}`, Number(dataArray[i + 2]))

                }
                backupData.push({
                    from: Number(dataArray[i]),
                    to: Number(dataArray[i + 1]),
                    weight: Number(dataArray[i + 2])
                })
            }
        } else {
            let row = 1, col = 1
            for (let i = 1; i < dataArray.length; ++i) {
                if (Number(dataArray[i]) > 0) {
                    if (values.graph_mode === 'undirected') {
                        edgeMap.set(`${col}-${row}`, Number(dataArray[i]))
                        if (edgeMap.get(`${row}-${col}`) !== undefined && edgeMap.get(`${row}-${col}`) !== edgeMap.get(`${col}-${row}`)) flag = false
                    }
                    backupData.push({
                        from: col,
                        to: row,
                        weight: Number(dataArray[i])
                    })
                }
                row = row + 1
                if (row === (backupData[0].numNode + 1)) {
                    row = 1
                    col = col + 1
                }
            }
            backupData[0].numEdge = backupData.length - 1
        }

        if (flag) {
            setData(backupData)
            message.success('Import Completed!')
        } else {
            message.error('Import Failed!')
        }
        setOpenModal(false)
    }

    const handleExport = () => {

        const date = new Date()
        const dateString = String(date.getDate()) + String(date.getMonth() + 1) + String(date.getFullYear())

        let fileContent = "data:text/txt;charset=utf-8,"
        const link = document.createElement('a')
        link.href = fileContent + localStorage.getItem('textData')
        link.download = `${localStorage.getItem('dataFormat') === 'al' ? 'adjacency-list' : 'weight-matrix'}-graph-${dateString}.txt`
        link.click()
    }

    return (
        <div style={{
            display: active ? 'flex' : 'none',
            justifyContent: 'space-between',
            marginTop: 10
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