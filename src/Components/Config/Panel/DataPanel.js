import { Input, Button, Radio, Tooltip, message } from 'antd'
import { useEffect, useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function DataPanel({ config, active, data, setData, setDisableMenu }) {

    const [textData, setTextData] = useState()
    const [enableEdit, setEnableEdit] = useState(false)
    const [dataFormat, setDataFormat] = useState('al')

    const [graphMode, setGraphMode] = useState(config.graph_mode)

    useEffect(() => {
        handleDataChange()
    }, [data, setData, dataFormat, setDataFormat])

    useEffect(() => {
        setEnableEdit(false)
    }, [])

    const handleDataChange = () => {
        let tempData = ''
        if (dataFormat === 'al') {
            tempData = tempData + data[0].numNode + ' ' + data[0].numEdge + '\n'
            data.forEach((item, index) => {
                if (!index) return
                tempData = tempData + item.from + ' ' + item.to + ' ' + item.weight + '\n'
            })
        } else {
            let tempMatrix = []
            for (let i = 0; i < data[0].numNode; ++i) {
                tempMatrix.push([])
                for (let j = 0; j < data[0].numNode; ++j) {
                    tempMatrix[i].push(0)
                }
            }
            data.forEach((item, index) => {
                if (!index) return
                tempMatrix[item.from - 1][item.to - 1] = item.weight
                if (graphMode === 'undirected') {
                    tempMatrix[item.to - 1][item.from - 1] = item.weight
                }
            })
            tempData = tempData + data[0].numNode + '\n'
            for (let i = 0; i < data[0].numNode; ++i) {
                for (let j = 0; j < data[0].numNode; ++j) {
                    tempData = tempData + tempMatrix[i][j]
                    if (j === data[0].numNode - 1) tempData = tempData + '\n'
                    else tempData = tempData + ' '
                }
            }
        }
        setTextData(tempData)
        localStorage.setItem('textData', tempData)
    }

    const checkTextData = () => {
        const edgeMap = new Map()
        let dataArray = []
        let flag = true
        let numNode, numEdge, numItem = 0;
        const textDataArray = textData.split(/[^\d]+/)
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
                if (dataFormat === 'al') {
                    numEdge = Number(textDataArray[i])
                    continue
                }
            }
            numItem = numItem + 1
        }

        if (dataFormat === 'wm') {
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
            graph_mode: graphMode
        }]

        if (dataFormat === 'al') {
            for (let i = 2; i < dataArray.length; i = i + 3) {
                if (edgeMap.get(`${Number(dataArray[i])}-${Number(dataArray[i + 1])}-${Number(dataArray[i + 2])}`) !== undefined) flag = false
                else edgeMap.set(`${Number(dataArray[i])}-${Number(dataArray[i + 1])}-${Number(dataArray[i + 2])}`, 1)
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
                    if (graphMode === 'undirected') {
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
            localStorage.setItem('textData', textData)
        }
        return flag;
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
                <Radio.Group value={graphMode} onChange={(event) => {
                    setGraphMode(event.target.value)
                }} disabled={!enableEdit}>
                    <Radio value='undirected'>Undirected</Radio>
                    <Radio value='directed'>Directed</Radio>
                </Radio.Group>
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
