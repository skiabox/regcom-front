import { useEffect, useState } from "react";
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

import { useObligationsContext } from "../../hooks/useObligationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const { SubMenu } = Menu;

const AMLArray = [];

const items = [
  {
    label: "AML",
    key: "aml",
    icon: <MailOutlined />,
    children: AMLArray
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
  const { obligations, dispatch } = useObligationsContext();
  const [amlArray, setAmlArray] = useState([]);
  const { user } = useAuthContext();
  console.log("INSIDE Universe.jsx - user object: ", user);

  useEffect(() => {
    const fetchObligations = async () => {
      const response = await fetch("/api/obligations", {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${user.token}`
        }
      });
      //convert again json array of objects to javascript array of objects
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_OBLIGATIONS", payload: json });
      }
    };

    if (user) {
      fetchObligations();
    }
  }, [dispatch, user]);

  if (obligations) {
    console.log("INSIDE Universe.jsx - obligations7: ", obligations);
  }

  const [current, setCurrent] = useState("default.pdf");
  const onClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  //chat gpt code
  const renderMenuItems = data => {
    return data.map((item, index) => {
      return <Menu.Item key={item.pdfDocument}>{item.title}</Menu.Item>;
    });
  };

  const renderSubMenu = () => {
    const groupedData = obligations.reduce((groups, item) => {
      const { mainCategory, title, pdfDocument } = item;
      if (!groups[mainCategory]) {
        groups[mainCategory] = [];
      }
      groups[mainCategory].push({ title, pdfDocument });
      return groups;
    }, {});

    return Object.keys(groupedData).map(mainCategory => {
      return (
        <SubMenu key={mainCategory} title={mainCategory}>
          {renderMenuItems(groupedData[mainCategory])}
        </SubMenu>
      );
    });
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
        >
          {renderSubMenu()}
        </Menu>
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
              fileUrl={`http://${process.env.REACT_APP_FILE_HOST}:4000/uploads/${current}`}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default Universe;
