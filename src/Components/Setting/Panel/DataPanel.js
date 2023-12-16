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

  useEffect(() => {
    let textDataTemp = "";
    data.forEach((item, index) => {
      if (!index) textDataTemp += item.numNode + " " + item.numEdge;
      else textDataTemp += item.source + " " + item.target + " " + item.weight;
      if (index !== data.length - 1) textDataTemp += "\n";
    });
    setTextData(textDataTemp);
  }, [data]);

  const handleEditData = async () => {
    if (enableEdit) {
      setLoading(true);
      await axios
        .post('/graph/check', {
          text: textData,
        })
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
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
                1. The first line contains two integers <strong>n</strong> and{" "}
                <strong>m</strong> which are the{" "}
                <strong>number of vertices</strong> and{" "}
                <strong>number of edges</strong> of the graph.
              </span>
              <span>
                2. The next <strong>m</strong> lines, each line includes 3
                integers <strong>u, v, c</strong> represent the edge connecting
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
