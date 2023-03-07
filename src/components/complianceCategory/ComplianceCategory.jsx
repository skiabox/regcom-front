import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { Row, Col, Progress } from "antd";
import "./complianceCategory.css";

const ComplianceCategory = ({ data }) => {
  // const progressData = [
  //     { value: data[0], name: 'Corporate Governance' },
  //     { value: data[1], name: 'GDPR' },
  //     { value: data[2], name: 'SOX' },
  //     { value: data[3], name: 'ISO' },
  //     { value: data[4], name: 'AML' },
  //   ]
  const color = ["#725798", "#00A7B5", "#E92841", "#219653", "#FF7D1E"];
  var option = {
    title: {
      text: "by Category",
      center: "right",
      textStyle: { color: "#725798", fontWeight: "700", fontSize: "24px" },
      itemGap: 25,
      padding: 20
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c}%"
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true }
      }
    },
    series: [
      {
        name: "by Category",
        type: "pie",
        radius: [35, 110],
        center: ["50%", "50%"],
        top: "27%",
        roseType: "radius",
        itemStyle: {
          borderRadius: 0,
          borderColor: "white",
          borderWidth: 3
        },
        label: {
          show: false
        },
        avoidLabelOverlap: true,
        emphasis: {
          label: {
            show: false,
            color: color
          }
        },
        color: color,
        data: data
      }
    ]
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="compChart">
        <Col span={8}>
          <ReactEcharts option={option} />
        </Col>
        <Col span={14} className="mt-3">
          {data.map((field, index) => {
            return (
              <div>
                <span> {field.name}</span>
                <Progress
                  className="mb-2"
                  percent={field.value}
                  strokeColor={color[index]}
                  showInfo={true}
                />
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default ComplianceCategory;
