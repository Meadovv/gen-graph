import { Input, Button, Radio, message } from 'antd'
import { useEffect, useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function DataPanel({ active, data, setData, setDisableMenu }) {

    const [textData, setTextData] = useState()
    const [enableEdit, setEnableEdit] = useState(false)
    const [dataFormat, setDataFormat] = useState('al')
    const [loading, setLoading] = useState(false)

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
    }

    const checkTextData = () => {
        setLoading(true)
        let dataArray = []
        let flag = true
        let numNode, numEdge, numItem = 0;
        const textDataArray = textData.split(/[^\d]+/)
        for(let i = 0; i < textDataArray.length; ++i) {
            if(textDataArray[i] === '') continue
            if(isNaN(Number(textDataArray[i]))) {
                flag = false
                continue
            }
            dataArray.push(Number(textDataArray[i]))
            if(i === 0) {
                numNode = Number(textDataArray[i])
                continue
            }
            if(i === 1) {
                if(dataFormat === 'al') {
                    numEdge = Number(textDataArray[i])
                    continue
                }
            }
            numItem = numItem + 1
        }

        if(dataFormat === 'wm') {
            if(numNode * numNode !== numItem) {
                flag = false
            }
        } else {
            if(numEdge * 3 !== numItem) {
                flag = false
            }
        }

        let backupData = [{
            numNode: Number(dataArray[0]),
            numEdge: Number(dataArray[1])
        }]

        if(dataFormat === 'al') {
            for(let i = 2; i < dataArray.length;i = i + 3) {
                backupData.push({
                    from: Number(dataArray[i]),
                    to: Number(dataArray[i + 1]),
                    weight: Number(dataArray[i + 2])
                })
            }
            setData(backupData)
        } else {
            let row = 1, col = 1
            for(let i = 1; i < dataArray.length; ++i) {
                if(Number(dataArray[i]) > 0) {
                    backupData.push({
                        from: col,
                        to: row,
                        weight: Number(dataArray[i])
                    })
                }
                row = row + 1
                if(row === (backupData[0].numNode + 1)) {
                    row = 1
                    col = col + 1
                }
            }
            backupData[0].numEdge = backupData.length - 1
            console.log(backupData)
            setData(backupData)
        }

        setLoading(false)
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
                justifyContent: 'space-between'
            }}>
                <div style={{ marginLeft: 10 }}>
                    Data Format
                    <QuestionCircleOutlined style={{ marginLeft: 10, cursor: 'pointer' }} />
                </div>
                <Radio.Group value={dataFormat} onChange={(event) => {
                    setDataFormat(event.target.value)
                }} disabled={enableEdit}>
                    <Radio value='wm'>Weight Matrix</Radio>
                    <Radio value='al'>Adjacency List</Radio>
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
                    ghost
                    danger={!enableEdit}
                    onClick={handleSaveTextData}
                    loading={loading}
                >{enableEdit ? 'Save' : 'Edit'}</Button>
            </div>
        </div>
    )
}
