import { Radio, InputNumber, Space, Slider } from 'antd'

export default function SettingPanel({ data, setData, active }) {

    const handleChangeSetting = (key, value) => {
        let backupArray = [...data]
        backupArray[0][key] = value
        setData(backupArray)
    }

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
                <Radio.Group value={data[0].graphMode} onChange={(event) => {
                    handleChangeSetting('graphMode', event.target.value)
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
                <InputNumber size='large' min={0} max={30} value={data[0].numNode} onChange={(value) => {
                    handleChangeSetting('numNode', value)
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
                    max={data[0].graphMode === 'undirected' ? (data[0].numNode * (data[0].numNode - 1)) / 2 : (data[0].numNode * (data[0].numNode - 1))} 
                    value={data[0].numEdge} 
                    onChange={(value) => {
                        handleChangeSetting('numEdge', value)
                }}/>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 10
            }}>
                <div>Weight</div>
                <Slider range min={1} max={20} value={data[0].weight} style={{
                    width: '50%'
                }} onChange={(value) => {
                    handleChangeSetting('weight', value)
                }}/>
            </div>
        </Space>
    )
}