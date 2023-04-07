import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./universe.css";
import { HomeOutlined, BarChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
//pdf related imports
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";

// Import the styles for the pdf viewer
// import "@react-pdf-viewer/core/lib/styles/index.css";

import { useObligationsContext } from "../../hooks/useObligationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//search text box
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import ColoredBulletLink from "../../components/shared/ColoredBulletLink";

const prefix = <SearchOutlined style={{ fontSize: 24, color: "purple" }} />;

const { SubMenu } = Menu;

//handlers
const onSearch = value => console.log(value);

const Universe = () => {
  const { obligations, dispatch } = useObligationsContext();
  const [amlArray, setAmlArray] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
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
      console.log("--->INSIDE Universe.jsx - user object: ", user);
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
        <SubMenu
          icon={
            mainCategory === "AML" ? <HomeOutlined /> : <BarChartOutlined />
          }
          key={mainCategory}
          title={mainCategory}
        >
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
            width: 315
          }}
          mode="inline"
        >
          {renderSubMenu()}
        </Menu>
      </div>
      <div className="universe-content">
        <Input
          placeholder="Αναζήτηση"
          allowClear
          size="large"
          prefix={prefix}
          onSearch={onSearch}
          style={{
            margin: "10px auto",
            width: "95%",
            padding: "15px",
            fontSize: "24px"
          }}
        />
        <div id="universe-category-links">
          <Link to="#test">
            <ColoredBulletLink text="AML" />
          </Link>
          <Link to="#test">
            <ColoredBulletLink text="Corporate Governance" />
          </Link>
          <Link to="#test">
            <ColoredBulletLink text="GDPR" />
          </Link>
          <Link to="#test">
            <ColoredBulletLink text="SOX" />
          </Link>
        </div>
        <hr />
        <div id="universe-document-details">
          <strong>Law1</strong>
          <p>In-Force Date 14-02-21 &emsp; Date of Last Update 15-10-2022</p>
        </div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "700px",
              width: "100%"
            }}
          >
            <Viewer
              fileUrl={`http://${process.env.REACT_APP_FILE_HOST}:4000/uploads/${current}`}
              defaultScale={SpecialZoomLevel.PageWidth}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default Universe;
