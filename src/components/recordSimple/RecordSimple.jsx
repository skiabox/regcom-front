import DateShow from "../dateShow/DateShow";
import "./recordSimple.css";

const RecordSimple = () => {
  return (
    <div className="recordSimple">
      <h3 className="recordSimpleTitle">
        Nos paucis ad haec additis finem faciamus aliquando;
      </h3>
      <div className="recordSimpleContent">
        <p>
          Nec hoc ille non vidit, sed verborum magnificentia est et gloria
          delectatus. Graece donan, Latine voluptatem vocant. Nemo nostrum
          istius generis.
        </p>
        <span className="dateIcon">
          <DateShow date="22-02-2023" />
        </span>
      </div>
    </div>
  );
};

export default RecordSimple;
