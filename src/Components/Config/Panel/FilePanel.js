import {
    DownloadOutlined,
    UploadOutlined,
    CloudUploadOutlined
} from '@ant-design/icons'
import {
    Space, Button, Modal, Form, Radio, Upload
} from 'antd'
import { useState } from 'react'

function ImportModal({ open, onCancel, importData }) {

    const [form] = Form.useForm()
    const initialValues = {
        graph_mode: 'undirected'
    }

    const handleFile = (file) => {
        const fileReader = new FileReader()
        fileReader.readAsText(file)
        fileReader.onload = (e) => {
            const fileData = e.target.result
            console.log(fileData)
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
                form.validateFields()
                    .then(formValue => {
                        form.resetFields()
                        importData(formValue)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }}
        >
            <Form
                form={form}
                layout='vertical'
                initialValues={initialValues}
            >
                <Form.Item
                    label='Graph Mode'
                    name='graph_mode'
                >
                    <Radio.Group>
                        <Radio value='undirected'>Undirected</Radio>
                        <Radio value='directed'>Directed</Radio>
                    </Radio.Group>
                </Form.Item>

                <Upload
                    beforeUpload={(file) => {
                        handleFile(file)
                        return false
                    }}
                    showUploadList={false}
                >
                    <Button size='large' type='primary' ghost icon={<CloudUploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form>
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