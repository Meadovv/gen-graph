import {
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Space, Button, Upload, message } from "antd";
import { useState } from "react";
import axios from "axios";

export default function FilePanel({ data, setData, active }) {
  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      importData(e.target.result);
    };
  };

  const importData = async (text) => {
    setLoading(false);
    axios
      .post("/graph/text-to-graph", {
        text: text,
      })
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
          setData(res.data.graph)
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      });
    setLoading(false);
  };

  const handleExport = () => {
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + localStorage.getItem("data");
    link.download = `gen-graph-export-${Date.now()}.txt`;
    link.click();
  };

  return (
    <div
      style={{
        display: active ? "flex" : "none",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <Space>
        <Upload
          beforeUpload={(file) => {
            handleFile(file);
            return false;
          }}
          showUploadList={false}
        >
          <Button
            loading={loading}
            size="large"
            type="primary"
            icon={<UploadOutlined />}
          >
            Import
          </Button>
        </Upload>
        <Button
          loading={loading}
          type="primary"
          size="large"
          icon={<DownloadOutlined />}
          onClick={handleExport}
        >
          Export
        </Button>
      </Space>
    </div>
  );
}
