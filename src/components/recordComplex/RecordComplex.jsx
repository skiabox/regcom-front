import "./recordComplex.css";

import { ReactComponent as NonCompliantIcon } from "../../assets/non-compliant.svg";
import { ReactComponent as ImmediateActionIcon } from "../../assets/immediate-action.svg";
import { ReactComponent as OwnerIcon } from "../../assets/owner.svg";
import { ReactComponent as CloseToExpireIcon } from "../../assets/close-to-expire.svg";

import DateShow from "../dateShow/DateShow";

const RecordComplex = ({ type }) => {
  return (
    <div className="record-complex-container">
      <div className="first-column">
        <h3>Nos paucis ad haec additis finem faciamus aliqu;</h3>
        <p>
          Nos paucis ad haec additis finem faciamus aliquando; Nec hoc ille non
          vidit, sed verborum magnificentia est et gloria delectatus. Graece
          donan.
        </p>
      </div>
      <div className="second-column">
        <NonCompliantIcon />
      </div>
      <div className="third-column">
        {type === "immediate" && <ImmediateActionIcon />}
        {type === "expire" && <CloseToExpireIcon />}
        {type === "default" && null}
        <span>
          <DateShow date="22-02-2023" />
        </span>
      </div>
      <div className="fourth-column">
        <OwnerIcon />
      </div>
    </div>
  );
};

export default RecordComplex;
