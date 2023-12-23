// Popup.js
import React, { useState, useEffect } from 'react';
import { FloatButton, Menu, Select, InputNumber, Button, message } from 'antd'
import { AimOutlined, SettingOutlined, DownloadOutlined } from '@ant-design/icons'
import './Popup.css';
import axios from 'axios'

const menuItems = [
  {
    label: 'Algorithms',
    key: 'algorithms',
    icon: <SettingOutlined />,
  },
  {
    label: 'Result',
    key: 'result',
    icon: <AimOutlined />,
  },
]

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


const Popup = ({ openModal, setOpenModal, data, sourceNode, setSourceNode, result, setResult, algorithm, setAlgorithm, traceInformation, setTraceInformation }) => {

  const [currentMenu, setCurrentMenu] = useState(menuItems[0].key)

  const [tracePath, setTracePath] = useState('')
  
  useEffect(() => {
    let temp = ''
    for(let i = 0; i < traceInformation.node.length - 1; ++i) {
      temp = temp + traceInformation.node[i] + ' > '
    }
    temp = temp + traceInformation.node[traceInformation.node.length - 1]
    setTracePath(temp)
  }, [traceInformation])

  useEffect(() => {
    setResult({
      algorithm: algorithms[0].value,
      result: {
        distance: [],
        trace: []
      }
    })
    setTraceInformation({
      distance: 0,
      node: [],
      edge: []
    })
  }, [data, algorithm])

  const pathfinding = async () => {
    if (data.length < 2) {
      message.error('Generate Data First')
      return
    }
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
          setCurrentMenu(menuItems[1].key)
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
        icon={<AimOutlined />}
        onClick={() => {
          setOpenModal(true)
        }}
        style={{
          left: 24,
          display: openModal ? 'none' : ''
        }}
      />
      <div className="popup-overlay" style={{
        display: openModal ? 'flex' : 'none'
      }}>
        <div className="popup-content">
          <div className="title">
            Pathfinding
            <span className="close-btn" onClick={() => {
              setOpenModal(false)
            }}>&times;</span>
          </div>
          <hr className="line" />
          <div className="content">
            <Menu onClick={(value) => setCurrentMenu(value.key)} selectedKeys={[currentMenu]} mode="horizontal" items={menuItems} />
            {
              currentMenu === menuItems[0].key ?
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 10
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
                </div> :
                <div style={{
                  marginTop: 10
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 18,
                  }}>
                    <div><strong>Distance:</strong> {traceInformation.distance}</div>
                    <div style={{
                      marginTop: 10
                    }}><strong>Trace:</strong> {tracePath}</div>
                  </div>
                  {
                    result && result.algorithm === 'floyd' ?
                      <div className='download-container'>
                        <Button
                          type='primary'
                          icon={<DownloadOutlined />}
                          size='large'
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = "data:text/txt;charset=utf-8," + result.distance
                            link.download = `floyd-result-${Date.now()}.txt`;
                            link.click();
                          }}
                        >Download Result</Button>
                        <div className='note'>* Available in Floyd Warshall Algorithm</div>
                      </div> : <></>
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
