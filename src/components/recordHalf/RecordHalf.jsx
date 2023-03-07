import "./recordHalf.css";

const RecordHalf = ({
  number,
  icon,
  numberColor,
  percentage,
  percentageText
}) => {
  return (
    <div className="record-half">
      <p className="first-line">Pending</p>
      <p className="second-line">Tasks</p>
      <p className="third-line">this month</p>
      <div className="fourth-line">
        <p className="number" style={{ color: numberColor }}>
          {number}
        </p>
        <span className="icon">{icon}</span>
      </div>
      <div className="fifth-line">
        <p className="percentage">
          <span className="percentage-first">{percentage}%</span>{" "}
          <span className="percentage-second">{percentageText}</span>
        </p>
      </div>
    </div>
  );
};

export default RecordHalf;
