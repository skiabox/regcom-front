import { useEffect } from "react";
import { useOrganizationsContext } from "../../hooks/useOrganizationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./editorOrganizations.css";

//Components
import OrganizationDetails from "../../components/editOrganizations/OrganizationDetails";
import OrganizationForm from "../../components/editOrganizations/OrganizationForm";

const EditorOrganizations = () => {
  const { organizations, dispatch } = useOrganizationsContext();
  const { user } = useAuthContext();
  console.log("INSIDE EditorOrganizations.jsx user object: ", user);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await fetch("/api/organizations", {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${user.token}`
        }
      });
      //convert again json array of objects to javascript array of objects
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ORGANIZATIONS", payload: json });
      }
    };

    if (user) {
      fetchOrganizations();
    }
  }, [dispatch, user]);

  return (
    <div className="home-editor">
      <div className="organizations">
        {organizations &&
          organizations.map(organization => (
            <OrganizationDetails
              key={organization._id}
              organization={organization}
            />
          ))}
      </div>
      <OrganizationForm />
    </div>
  );
};

export default EditorOrganizations;
