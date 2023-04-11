import { useState } from "react";
import { useOrganizationsContext } from "../../hooks/useOrganizationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import Select from "react-select";
import { industryOptions, sizeOptions } from "../../data/data";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const OrganizationForm = () => {
  const { dispatch } = useOrganizationsContext();
  const { user } = useAuthContext();

  //form fields
  const [customerCode, setCustomerCode] = useState("");
  const [fiscalEndDate, setFiscalEndDate] = useState(null);
  const [taxId, setTaxId] = useState("");
  const [isListed, setIsListed] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [size, setSize] = useState("Unknown");

  //error message
  const [error, setError] = useState(null);

  const [emptyFields, setEmptyFields] = useState([]);

  const [mainCategory, setMainCategory] = useState(null);

  //react-select options
  const options = [
    { value: "AML", label: "AML" },
    { value: "Corporate Governance", label: "Corporate Governance" },
    { value: "GDPR", label: "GDPR" },
    { value: "Real Estate", label: "Real Estate" },
    { value: "SOX", label: "SOX" },
    { value: "COVID-19", label: "COVID-19" },
    { value: "HIPAA", label: "HIPAA" },
    { value: "NIST", label: "NIST" }
  ];

  const onListedOptionChange = e => {
    setIsListed(e.target.value === "true" ? true : false);
  };

  //react-select handlers
  const handleMainCategoryChange = selectedOption => {
    setMainCategory(selectedOption.value);
    console.log(`Main Category Option selected:`, selectedOption);
  };

  const handleIndustriesChange = selectedOption => {
    setIndustries(() => selectedOption.map(option => option.value));
  };

  const handleSizeChange = selectedOption => {
    setSize(selectedOption.value);
    console.log(`Size Option selected:`, selectedOption);
  };

  //handlers
  const handleSubmit = async e => {
    e.preventDefault();

    //const formData = new FormData();

    if (!user) {
      setError("You need to be logged in to add an organization");
      return;
    }

    const organization = {
      customerCode,
      //fiscalEndDate: format(fiscalEndDate, "yyyy-MM-dd"),
      fiscalEndDate,
      taxId
    };
    //formData.append("customerCode", organization.customerCode);
    //formData.append("fiscalEndDate", organization.fiscalEndDate);
    //formData.append("taxId", organization.taxId);

    // for (const key of formData.keys()) {
    //   console.log("formData keys--->");
    //   console.log(key);
    // }

    // for (const value of formData.values()) {
    //   console.log("formData values--->");
    //   console.log(value);
    // }

    const response = await fetch("/api/organizations", {
      method: "POST",
      body: JSON.stringify(organization),
      //body: formData,
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`
      }
    });

    //a single obligation object
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      //reference.current.value = null;
      setIndustries([]);
      setCustomerCode("");
      setFiscalEndDate(null);
      setTaxId("");
      setMainCategory(mainCategory);
      setError(null);
      setEmptyFields([]);
      console.log("new organization added", json);
      dispatch({ type: "CREATE_ORGANIZATION", payload: json });
    }
  };

  let footer = <p>Please pick a day.</p>;
  if (fiscalEndDate) {
    console.log("fiscalEndDate:", fiscalEndDate);
    footer = <p>You picked {format(fiscalEndDate, "PP")}.</p>;
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Organization</h3>

      <label>Organization Code:</label>
      <input
        type="text"
        onChange={e => setCustomerCode(e.target.value)}
        value={customerCode}
        className={emptyFields?.includes("customerCode") ? "error" : ""}
      />

      <label>Fiscal End Date:</label>
      <DayPicker
        captionLayout="dropdown-buttons"
        fromYear={2015}
        toYear={2025}
        mode="single"
        selected={fiscalEndDate}
        onSelect={setFiscalEndDate}
        footer={footer}
      />

      <label>Tax id:</label>
      <input
        type="text"
        onChange={e => setTaxId(e.target.value)}
        value={taxId}
        className={emptyFields?.includes("taxId") ? "error" : ""}
      />

      <button id="submitButton">Add Organization</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default OrganizationForm;
