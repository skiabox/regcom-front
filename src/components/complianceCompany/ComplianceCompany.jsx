import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { Row, Col, Progress } from "antd";
import "./complianceCompany.css";

const ComplianceCompany = ({ data }) => {
  const companies = ["Company 1", "Company 2", "Company 3", "Company 4"];
  var option = {
    width: "60%",
    title: {
      text: "by Company",
      center: "right",
      textStyle: {
        color: "#725798",
        fontWeight: "700",
        fontSize: "24px",
        marginBottom: "20px"
      },
      itemGap: 25,
      padding: 20
    },
    yAxis: {
      type: "category",
      data: companies
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 25,
      axisLabel: {
        formatter: "{value}%"
      }
    },

    grid: {
      left: "20%",
      top: "25%",
      bottom: "10%"
    },
    series: [
      {
        data: data,
        type: "bar",
        itemStyle: { color: "#00A7B5" }
      }
    ]
  };

  return (
    <div>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="complianceComp"
      >
        <Col span={24}>
          <ReactEcharts option={option} />
        </Col>
      </Row>
    </div>
  );
};

export default ComplianceCompany;
