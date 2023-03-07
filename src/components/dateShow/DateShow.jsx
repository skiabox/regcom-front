import "./dateShow.css";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";

const DateShow = ({ date }) => {
  return (
    <div className="dateContainer">
      <CalendarIcon /> <span>{date}</span>
    </div>
  );
};

export default DateShow;
