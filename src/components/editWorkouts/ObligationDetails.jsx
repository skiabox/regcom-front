import { useObligationsContext } from "../../hooks/useObligationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

//pdf related imports
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import the styles for the pdf viewer
import "@react-pdf-viewer/core/lib/styles/index.css";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";

const ObligationDetails = ({ obligation }) => {
  const { dispatch } = useObligationsContext();
  const { user } = useAuthContext();

  //handlers
  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/obligations/${obligation._id}`, {
      method: "DELETE",
      headers: {
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`
      }
    });
    //get the workout object from the back end
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_OBLIGATION", payload: json });
    }
  };

  return (
    <div className="obligation-details">
      <h4>{obligation.title}</h4>
      <div>
        <strong>In-Force-Date: </strong>
        {format(new Date(obligation.inForceDate), "PP")}
      </div>
      <div>
        <strong>Apply To All: </strong>
        {obligation.applyToAll ? "Yes" : "No"}
        {!obligation.applyToAll && (
          <>
            <div style={{ marginLeft: "10px" }}>
              <strong>Size:</strong>
              {obligation.size}
            </div>
            <div style={{ marginLeft: "10px" }}>
              <strong>Is listed:</strong>
              {obligation.isListed ? "Yes" : "No"}
            </div>
            <div style={{ marginLeft: "10px" }}>
              <strong>Industries:</strong>
              <ul>
                {obligation.industries.map(industry => (
                  <li key={industry}>{industry}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div>
        <strong>Main Category: </strong>
        {obligation.mainCategory}
      </div>
      {/* <Document file={`http://localhost:4001/uploads/${workout.pdfDocument}`} /> */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div
          style={{
            // border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "700px"
          }}
        >
          <Viewer
            fileUrl={`http://localhost:4000/uploads/${obligation.pdfDocument}`}
          />
        </div>
      </Worker>
      <p>
        {formatDistanceToNow(new Date(obligation.createdAt), {
          addSuffix: true
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ObligationDetails;
