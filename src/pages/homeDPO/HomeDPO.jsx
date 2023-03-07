import "./homeDPO.css";
import Navbar from "../../components/navbar/Navbar";
import RecordSimple from "../../components/recordSimple/RecordSimple";
import TotalCompliance from "../../components/totalCompliance/TotalCompliance";
import RecordHalf from "../../components/recordHalf/RecordHalf";

import { ReactComponent as ErrorIcon } from "../../assets/error.svg";
import { ReactComponent as GoodIcon } from "../../assets/good.svg";
import LinkButton from "../../components/linkButton/LinkButton";
import RecordComplex from "../../components/recordComplex/RecordComplex";
import ComplianceCompany from "../../components/complianceCompany/ComplianceCompany";
import ComplianceCategory from "../../components/complianceCategory/ComplianceCategory";
import AreaChart from "../../components/areaChart/AreaChart";

const HomeDPO = () => {
  const progressData = [
    { value: 70, name: "Corporate Governance" },
    { value: 60, name: "GDPR" },
    { value: 30, name: "SOX" },
    { value: 40, name: "ISO" },
    { value: 35, name: "AML" }
  ];

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="homeContainer">
          {/* <h1 className="homeTitle">This is the home page</h1>
          <RecordSimple /> */}
          <div className="leftArea" flex={2}>
            <ComplianceCategory data={progressData}></ComplianceCategory>
            <div className="closeToExpired">
              <h1>Close to Expire</h1>
              <div className="flexContainer">
                <div className="columns">Compliance Obligation</div>
                <div className="columns">Compliance Assessment</div>
                <div className="columns">Due Date</div>
                <div className="columns">Owner</div>
              </div>
              <div className="mainContent">
                <RecordComplex type="expire" />
                <RecordComplex type="expire" />
              </div>
              <div className="footer">
                <a>view more</a>
              </div>
            </div>
            <div className="whatIsNew">
              <h1>What's New</h1>
              <div className="flexContainer">
                <div className="columns">Compliance Obligation</div>
                <div className="columns">Compliance Assessment</div>
                <div className="columns">Due Date</div>
                <div className="columns">Owner</div>
              </div>
              <div className="mainContent">
                <RecordComplex type="default" />
                <RecordComplex type="default" />
              </div>
              <div className="footer">
                <a>view more</a>
              </div>
            </div>
          </div>
          <div className="rightArea" flex={1}>
            <TotalCompliance />
            <h1 className="my-tasks">My Tasks</h1>
            <div className="two-halfs">
              <RecordHalf
                number={10}
                icon={<ErrorIcon />}
                numberColor="#b00020"
                percentage={4}
                percentageText="remaining to complete the target"
              />
              <RecordHalf
                number={30}
                icon={<GoodIcon />}
                numberColor="#58AB5C"
                percentage={96}
                percentageText="of target achieved"
              />
            </div>
            <RecordSimple />
            <RecordSimple />
            <RecordSimple />
            <RecordSimple />
            <LinkButton text="Go to my Tasklist" />
            <ComplianceCompany data={[80, 60, 90, 40, 35]}></ComplianceCompany>
            <div className="areaChartContainer">
              <AreaChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDPO;
