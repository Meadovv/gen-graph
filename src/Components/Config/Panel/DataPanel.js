import { Input, Button, Radio, message } from 'antd'
import { useEffect, useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function DataPanel({ config, setConfig, active, data, setData }) {

    const [textData, setTextData] = useState()
    const [enableEdit, setEnableEdit] = useState(false)
    const [dataFormat, setDataFormat] = useState('al')

    useEffect(() => {
        handleDataChange()
        setEnableEdit(false)
    }, [data, setData, dataFormat, setDataFormat])

    const handleDataChange = () => {
        let tempData = ''
        if(dataFormat === 'al') {
            tempData = tempData + data[0].numNode + ' ' + data[0].numEdge + '\n'
            data.forEach((item, index) => {
                if(!index) return
                tempData = tempData + item.from + ' ' + item.to + ' ' + item.weight + '\n'
            })
        } else {
            let tempMatrix = []
            for(let i = 0; i < data[0].numNode; ++i) {
                tempMatrix.push([])
                for(let j = 0; j < data[0].numNode; ++j) {
                    if(i == j) tempMatrix[i].push(0)
                    else tempMatrix[i].push(-1)
                }
            }
            data.forEach((item, index) => {
                if(!index) return
                tempMatrix[item.from - 1][item.to - 1] = item.weight
            })
            tempData = tempData + data[0].numNode + '\n'
            for(let i = 0; i < data[0].numNode; ++i) {
                for(let j = 0; j < data[0].numNode; ++j) {
                    tempData = tempData + tempMatrix[i][j]
                    if(j === data[0].numNode - 1) tempData = tempData + '\n'
                    else tempData = tempData + ' '
                }
            }
        }
        setTextData(tempData)
    }

    const checkTextData = () => {
        return true
    }

    const handleSaveTextData = () => {
        console.log(textData)
        if(checkTextData()) {
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
                <div style={{marginLeft: 10}}>
                    Data Format
                    <QuestionCircleOutlined style={{marginLeft: 10, cursor: 'pointer'}}/>
                </div>
                <Radio.Group value={dataFormat} onChange={(event) => {
                    setDataFormat(event.target.value)
                }}>
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
                >{enableEdit ? 'Save' : 'Edit'}</Button>
            </div>
        </div>
    )
}
