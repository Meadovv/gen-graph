import { Radio, InputNumber, Space, Slider, Button, message } from 'antd'
import { useState } from 'react'
import axios from 'axios';

const defaultConfig = {
    numNode: 5,
    numEdge: 5,
    weight: [5, 10],
    graphMode: 'undirected'
}

export default function ConfigPanel({ setData, active }) {

    const [config, setConfig] = useState(defaultConfig)
    const [loading, setLoading] = useState(false)

    const Generate = async () => {
        setLoading(true)
        await axios.post('/graph/generate',
            {
                numNode: config.numNode,
                numEdge: config.numEdge,
                weight: config.weight,
                graphMode: config.graphMode
            }).then(res => {
                if (res.data.success) {
                    setData(res.data.graph)
                    message.success(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            }).catch(err => {
                console.log(err)
                message(err.message)
            })
        setLoading(false)
    }

    return (
        <Space style={{
            display: active ? 'flex' : 'none'
        }}
        direction='vertical'>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10
            }}>
                <div>Graph Mode</div>
                <Radio.Group value={config.graphMode} onChange={(event) => {
                    setConfig({
                        ...config,
                        graphMode: event.target.value
                    }) 
                }}>
                    <Radio value='undirected'>Undirected</Radio>
                    <Radio value='directed'>Directed</Radio>
                </Radio.Group>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10
            }}>
                <div>Number of Node</div>
                <InputNumber size='large' min={0} max={1000} value={config.numNode} onChange={(value) => {
                    setConfig({
                        ...config,
                        numNode: value
                    })
                }} />
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10
            }}>
                <div>Number of Edge</div>
                <InputNumber
                    size='large'
                    min={1}
                    max={config.graphMode === 'undirected' ? (config.numNode * (config.numNode - 1)) / 2 : (config.numNode * (config.numNode - 1))}
                    value={config.numEdge}
                    onChange={(value) => {
                        setConfig({
                            ...config,
                            numEdge: value
                        })
                    }} />
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10
            }}>
                <div>Weight</div>
                <Slider range min={1} max={20} value={config.weight} style={{
                    width: '50%'
                }} onChange={(value) => {
                    setConfig({
                        ...config,
                        weight: value
                    })
                }} />
            </div>

            <div>
                <Button type='primary' size='large' onClick={() => {
                    setConfig(defaultConfig)
                }} style={{ marginRight: 10 }} >Reset</Button>
                <Button loading={loading} type='primary' size='large' danger onClick={Generate}>Generate</Button>
            </div>
        </Space>
    )
}