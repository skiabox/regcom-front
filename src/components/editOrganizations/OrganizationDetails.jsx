import { useOrganizationsContext } from "../../hooks/useOrganizationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";

const OrganizationDetails = ({ organization }) => {
  const { dispatch } = useOrganizationsContext();
  const { user } = useAuthContext();

  //handlers
  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/organizations/${organization._id}`, {
      method: "DELETE",
      headers: {
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`
      }
    });
    //get the organization object from the back end
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ORGANIZATION", payload: json });
    }
  };

  return (
    <div className="organization-details">
      <h4>{organization.customerCode}</h4>
      <div>
        <strong>Fiscal End Date: </strong>
        {format(new Date(organization.fiscalEndDate), "PP")}
      </div>
      <div>
        <strong>Tax Id: </strong>
        {organization.taxId}
      </div>

      <p>
        {formatDistanceToNow(new Date(organization.createdAt), {
          addSuffix: true
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default OrganizationDetails;
