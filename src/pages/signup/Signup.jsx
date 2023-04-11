import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import "./signup.css";

import Select from "react-select";
import { useOrganizationsContext } from "../../hooks/useOrganizationsContext";

const Signup = () => {
  const { organizations, dispatch } = useOrganizationsContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");

  //react-select options
  const options = [
    { value: "editor", label: "Editor" },
    { value: "simpleUser", label: "Simple User" },
    { value: "dpoUser", label: "Dpo User" }
  ];

  //grab what we want from useLogin hook
  const { signup, error, isLoading } = useSignup();

  const navigate = useNavigate();

  //fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await fetch("/api/organizations");
      //convert again json array of objects to javascript array of objects
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ORGANIZATIONS", payload: json });
      }
    };

    fetchOrganizations();
  }, [dispatch]);

  let organizationOptions = [];

  if (organizations) {
    // for each loop
    for (let i = 0; i < organizations.length; i++) {
      organizationOptions.push({
        value: organizations[i].customerCode.toLowerCase(),
        label: organizations[i].customerCode
      });
    }
  }

  //react-select handler
  const handleChange = selectedOption => {
    setRole(selectedOption.value);
    console.log(`Option selected:`, selectedOption);
  };

  const handleChangeOrganization = selectedOption => {
    setOrganization(selectedOption.value);
    console.log(`Option selected:`, selectedOption);
  };

  //handlers
  const handleSubmit = async e => {
    e.preventDefault();

    await signup(email, password, role);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <p>Εγγραφή Χρήστη</p>

      <label id="labelEmail">Email</label>
      <input
        id="inputEmail"
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        autoComplete="new-password"
      />

      <label id="labelPassword">Κωδικός Πρόσβασης</label>
      <input
        id="inputPassword"
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        autoComplete="new-password"
      />

      <label id="labelRole">Ρόλος</label>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "#fff",
            border: "1px solid #D0D5DD",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderRadius: "8px",
            width: "200px"
          })
        }}
        className="react-select-signup"
        options={options}
        onChange={handleChange}
      />

      <label id="labelOrganization">Οργανισμός</label>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "#fff",
            border: "1px solid #D0D5DD",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderRadius: "8px",
            width: "200px"
          })
        }}
        className="react-select-signup-organization"
        options={organizationOptions}
        onChange={handleChangeOrganization}
      />

      <button disabled={isLoading}>Εγγραφή</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
