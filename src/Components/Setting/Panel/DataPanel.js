import { Input, Button, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import {
  QuestionCircleOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";

export default function DataPanel({ active, data, setData, setDisableMenu }) {
  const [textData, setTextData] = useState();
  const [enableEdit, setEnableEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDataChange = () => {
    let textDataTemp = "";
    data.forEach((item, index) => {
      if (!index) textDataTemp += item.numNode + " " + item.numEdge + " " + (item.graphMode === 'directed' ? 1 : 0);
      else textDataTemp += item.source + " " + item.target + " " + item.weight;
      if (index !== data.length - 1) textDataTemp += "\n";
    });
    localStorage.setItem('data', textDataTemp)
    setTextData(textDataTemp);
    setDisableMenu(false);
  };

  useEffect(() => {
    handleDataChange();
  }, [data]);

  const handleEditData = async () => {
    if (enableEdit) {
      setLoading(true);
      await axios
        .post("/graph/text-to-graph", {
          text: textData,
        })
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            setData(res.data.graph);
            setDisableMenu(!enableEdit);
            setEnableEdit((current) => !current);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error(err.message);
        });
      setLoading(false);
    } else {
      setDisableMenu(!enableEdit);
      setEnableEdit((current) => !current);
    }
  };

  return (
    <div
      style={{
        display: active ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Input.TextArea
        style={{
          marginTop: 10,
        }}
        value={textData}
        onChange={(event) => {
          setTextData(event.target.value);
        }}
        disabled={!enableEdit}
        autoSize
      />
      <div
        style={{
          marginTop: 10,
          display: "flex",
        }}
      >
        <Button
          loading={loading}
          type="primary"
          size="large"
          danger
          icon={<CloseOutlined />}
          style={{
            display: enableEdit ? "" : "none",
            marginRight: 10,
          }}
          onClick={() => {
            handleDataChange();
            setEnableEdit((current) => !current);
          }}
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          type="primary"
          size="large"
          danger={!enableEdit}
          onClick={handleEditData}
          icon={!enableEdit ? <EditOutlined /> : <SaveOutlined />}
        >
          {enableEdit ? "Save" : "Edit"}
        </Button>

        <Tooltip
          style={{
            width: "50%",
            height: "100vh",
          }}
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <strong>
                Data for a graph must comply with the following principles:
              </strong>
              <span>
                1. The first line contains three positive integers <strong>n, m</strong> and{" "}
                <strong>p</strong> which are the{" "}
                <strong>number of vertices</strong>, {" "}
                <strong>number of edges</strong> and <strong>graph mode</strong>.{" "}
                <strong>p = 0</strong> is <strong>undirected graph</strong>,{" "}
                <strong>otherwise</strong> is <strong>directed graph</strong>
              </span>
              <span>
                2. The next <strong>m</strong> lines, each line includes 3 positive
                integers <strong>u, v, c</strong> represent the edge <strong>connecting</strong>{" "}
                vertex <strong>u</strong> with vertex <strong>v</strong> with
                weight <strong>c</strong> on the graph.
              </span>
            </div>
          }
          trigger="click"
        >
          <QuestionCircleOutlined
            style={{
              marginLeft: 10,
              cursor: "pointer",
              fontSize: 18,
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
}
