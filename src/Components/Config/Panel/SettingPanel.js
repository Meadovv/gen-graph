import { Radio, InputNumber, Space, Slider } from 'antd'

export default function SettingPanel({ config, setConfig, active }) {

    return (
        <Space style={{
            display: active ? 'flex' : 'none'
        }} direction='vertical'>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10
            }}>
                <div>Graph Mode</div>
                <Radio.Group value={config.graph_mode} onChange={(event) => {
                    setConfig({
                        ...config,
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
                width: '100%',
                marginTop: 10
            }}>
                <div>Number of Node</div>
                <InputNumber size='large' min={0} max={30} value={config.num_node} onChange={(value) => {
                    setConfig({
                        ...config,
                        num_node: value
                    })
                }}/>
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
                    max={config.graph_mode === 'undirected' ? (config.num_node * (config.num_node - 1)) / 2 : (config.num_node * (config.num_node - 1))} 
                    value={config.num_edge} 
                    onChange={(value) => {
                    setConfig({
                        ...config,
                        num_edge: value
                    })
                }}/>
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
                }}/>
            </div>
        </Space>
    )
}