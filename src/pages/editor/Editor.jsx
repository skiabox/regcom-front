import { useEffect } from "react";
import { useObligationsContext } from "../../hooks/useObligationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./editor.css";

//Components
import ObligationDetails from "../../components/editObligations/ObligationDetails";
import ObligationForm from "../../components/editObligations/ObligationForm";

const Editor = () => {
  const { obligations, dispatch } = useObligationsContext();
  const { user } = useAuthContext();
  console.log("INSIDE Editor.jsx", user);

  useEffect(() => {
    const fetchObligations = async () => {
      const response = await fetch("/api/obligations", {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${user.token}`
        }
      });
      //convert again json array of objects to javascript array of objects
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_OBLIGATIONS", payload: json });
      }
    };

    if (user) {
      fetchObligations();
    }
  }, [dispatch, user]);

  return (
    <div className="home-editor">
      <div className="obligations">
        {obligations &&
          obligations.map(obligation => (
            <ObligationDetails key={obligation._id} obligation={obligation} />
          ))}
      </div>
      <ObligationForm />
    </div>
  );
};

export default Editor;
