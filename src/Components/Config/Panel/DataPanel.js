import { Input, Button, Radio, Tooltip, message } from 'antd'
import { useEffect, useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function DataPanel({ active, data, setData, setDisableMenu }) {

    const [textData, setTextData] = useState()
    const [enableEdit, setEnableEdit] = useState(false)
    const [dataFormat, setDataFormat] = useState('al')

    useEffect(() => {
        setEnableEdit(false)
    }, [])

    const handleDataChange = () => {

    }

    const checkTextData = () => {

    }

    const handleSaveTextData = () => {
        if (checkTextData()) {
            setDisableMenu(current => !current)
            setEnableEdit(current => !current)
        } else {
            message.error('Wrong Format!')
        }
    }

    return (
        <div style={{
            display: active ? 'flex' : 'none',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 10
            }}>
                <div style={{ marginLeft: 10 }}>
                    Data Format
                    <Tooltip
                        style={{
                            width: '50%',
                            height: '100vh'
                        }}
                        title={
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <strong>Data for a graph must comply with the following principles:</strong>
                                {
                                    dataFormat === 'wm' ?
                                        <>
                                            <span>1. The first line contains an integer <strong>n</strong> that is <strong>the number of vertices in the graph</strong>.</span>
                                            <span>2. The <strong>next n lines</strong> each contain <strong>exactly n integers</strong>. The number in row <strong>i</strong> and column <strong>j</strong> is <strong>0</strong> if there is no edge connecting vertex i to vertex j in the graph. Conversely, the weight of the edge connecting vertex <strong>i</strong> to vertex <strong>j</strong> is <strong>that number</strong>.</span>
                                        </> :
                                        <>
                                            <span>1. The first line contains two integers <strong>n</strong> and <strong>m</strong> which are the <strong>number of vertices</strong> and <strong>number of edges</strong> of the graph.</span>
                                            <span>2. The next <strong>m</strong> lines, each line includes 3 integers <strong>u, v, c</strong> represent the edge connecting vertex <strong>u</strong> with vertex <strong>v</strong> with weight <strong>c</strong> on the graph.</span>
                                        </>
                                }
                            </div>
                        }
                        trigger='click'
                    >
                        <QuestionCircleOutlined style={{ marginLeft: 10, cursor: 'pointer' }} />
                    </Tooltip>
                </div>
                <Radio.Group value={dataFormat} onChange={(event) => {
                    setDataFormat(event.target.value)
                }} disabled={enableEdit}>
                    <Radio value='wm'>Weight Matrix</Radio>
                    <Radio value='al'>Adjacency List</Radio>
                </Radio.Group>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 10
            }}>
                <div style={{ marginLeft: 10 }}>
                    Graph Mode
                </div>
                <div>
                    {data[0].graph_mode === 'undirected' ? 'Undirected' : 'Directed'}
                </div>
            </div>

            <Input.TextArea
                style={{
                    marginTop: 10,
                    height: '70vh',
                }}
                value={textData}
                onChange={(event) => {
                    setTextData(event.target.value)
                }}
                disabled={!enableEdit}
            />
            <div style={{
                marginTop: 10
            }}>
                <Button
                    type='primary'
                    size='large'
                    danger={!enableEdit}
                    onClick={handleSaveTextData}
                >{enableEdit ? 'Save' : 'Edit'}</Button>
            </div>
        </div>
    )
}
