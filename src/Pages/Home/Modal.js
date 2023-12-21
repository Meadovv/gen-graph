import { Drawer, FloatButton, Select, InputNumber, Button, Divider, message } from 'antd';
import { AimOutlined, DownloadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import axios from 'axios'

const algorithms = [
    {
        label: 'Bellman Ford',
        value: 'bellman'
    },
    {
        label: 'Dijkstra',
        value: 'dijkstra'
    },
    {
        label: 'Floyd Warshall',
        value: 'floyd'
    }
]

export default function Modal({ data, sourceNode, setSourceNode, result, setResult, algorithm, setAlgorithm }) {

    const [open, setOpen] = useState(false)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setResult(null)
    }, [data, algorithm])

    const pathfinding = async () => {
        setResult(null)
        await axios.post('/graph/pathfinding',
            {
                algorithm: algorithm,
                source: sourceNode,
                graphData: data
            }).then(res => {
                if (res.data.success) {
                    setResult({
                        algorithm: algorithm,
                        result: res.data.result
                    })
                    message.success(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            }).catch(err => {
                console.log(err)
                message.error(err.message)
            })
    }

    return (
        <>
            <FloatButton
                onClick={showDrawer}
                icon={<AimOutlined />}
                style={{
                    right: 24 + 70,
                }}
            />
            <Drawer
                title="Pathfinding"
                placement='right'
                size='large'
                onClose={onClose}
                open={open}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <div>Algorithm:</div>
                        <Select
                            value={algorithm}
                            style={{
                                width: '12rem',
                            }}
                            options={algorithms}
                            onChange={(value) => {
                                setAlgorithm(value)
                            }}
                        />
                    </div>
                    <div style={{
                        display: algorithm === algorithms[2].value ? 'none' : 'flex',
                        alignItems: 'center',
                        marginTop: '1rem',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <div>Source:</div>
                        <InputNumber
                            value={sourceNode}
                            style={{
                                width: '12rem'
                            }}
                            onChange={(value) => {
                                setSourceNode(value === null ? 0 : value)
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem',
                        justifyContent: 'flex-end'
                    }}>
                        <Button type='primary' size='large' onClick={pathfinding}>
                            Find
                        </Button>
                    </div>

                    <div>
                        <Divider orientation="left" style={{
                            borderColor: 'gray'
                        }}>
                            <div style={{
                                fontWeight: 'bold'
                            }}>Result</div>
                        </Divider>
                    </div>
                    {
                        result === null ? <></> :
                        result?.algorithm === 'dijkstra' ?
                            <>
                                <div>AAA</div>
                            </> : 
                        result.algorithm === 'floyd' ?
                            <>
                                <Button
                                    type='primary'
                                    icon={<DownloadOutlined />}
                                    size='large'
                                    onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "data:text/csv;charset=utf-8," + result.distance
                                        link.download = `floyd-result-${Date.now()}.txt`;
                                        link.click();
                                    }}
                                >Download Result</Button>
                            </> : <></>
                    }
                    <div>
                        <strong>Note: </strong>

                    </div>
                </div>
            </Drawer>
        </>
    )
}