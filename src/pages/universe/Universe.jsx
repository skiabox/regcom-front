import { useState } from "react";
import "./universe.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
//pdf related imports
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";

// Import the styles for the pdf viewer
// import "@react-pdf-viewer/core/lib/styles/index.css";

const items = [
  {
    label: "AML",
    key: "aml",
    icon: <MailOutlined />,
    children: [
      {
        label: "Aml Option 1",
        key: "aml-option-1"
      },
      {
        label: "Aml Option 2",
        key: "aml-option-2"
      },
      {
        label: "Aml Option 3",
        key: "aml-option-3"
      }
    ]
  },
  {
    label: "SOX",
    key: "sox",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "Sox Option 1",
        key: "sox-option-1"
      },
      {
        label: "Sox Option 2",
        key: "sox-option-2"
      },
      {
        label: "Sox Option 3",
        key: "sox-option-3"
      }
    ]
  }
];

const Universe = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="universe-container">
      <div className="universe-sidebar">
        by Category
        <Menu
          onClick={onClick}
          style={{
            width: 256
          }}
          mode="inline"
          items={items}
        />
      </div>
      <div className="universe-content">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "700px",
              width: "700px"
            }}
          >
            <Viewer
              fileUrl={`http://localhost:4000/uploads/AML-Test-Law-1.pdf`}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default Universe;
