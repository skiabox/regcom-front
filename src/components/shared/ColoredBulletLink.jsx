import { Tag } from "antd";
import styled from "styled-components";

const GtTag = styled(Tag)`
  border-radius: 16px;
`;

const ColoredBulletLink = ({ text }) => {
  let returnedJSX = null;

  switch (text) {
    case "AML":
      returnedJSX = (
        <GtTag color="#E6DBF7">
          <span style={{ color: "#344054" }}>{text}</span>
        </GtTag>
      );
      break;

    default:
      returnedJSX = (
        <GtTag color="#F2F4F7">
          <span style={{ color: "#344054" }}>{text}</span>
        </GtTag>
      );
  }
  return returnedJSX;
};

export default ColoredBulletLink;
