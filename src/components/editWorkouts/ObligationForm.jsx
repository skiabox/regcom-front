import { useRef, useState } from "react";
import { useObligationsContext } from "../../hooks/useObligationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import Select from "react-select";
import { industryOptions, sizeOptions } from "../../data/data";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const ObligationForm = () => {
  // create a ref for the file input
  const inputRef = useRef(null);

  const { dispatch } = useObligationsContext();
  const { user } = useAuthContext();

  //form fields
  const [title, setTitle] = useState("");
  const [inForceDate, setInForceDate] = useState(null);
  const [applyToAll, setApplyToAll] = useState(true);
  const [isListed, setIsListed] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [size, setSize] = useState("Unknown");

  //error message
  const [error, setError] = useState(null);

  const [emptyFields, setEmptyFields] = useState([]);

  const [mainCategory, setMainCategory] = useState(null);

  //file related state
  const [singleFile, setSingleFile] = useState("");

  //file related handlers
  const SingleFileChange = e => {
    setSingleFile(e.target.files[0]);
  };

  const resetFileInput = () => {
    // 👇️ reset input value
    inputRef.current.value = null;
  };

  //define formData
  // const formData = new FormData();

  // 'file' append argument is taken from the backend routes file
  const uploadSingleFile = async () => {
    //formData.append("pdfDocument", singleFile);
    // console.log("singleFile", singleFile);
    // console.log("formData", formData.get("pdfDocument"));
    // await singleFileUpload(formData);
    // //console.log(singleFile);
    // getsingle();
  };

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

  //options for radio buttons code here
  const onApplyToAllOptionChange = e => {
    setApplyToAll(e.target.value === "true" ? true : false);
  };

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

    const formData = new FormData();
    resetFileInput();

    if (!user) {
      setError("You need to be logged in to add a workout");
      return;
    }

    formData.get("pdfDocument");

    const obligation = {
      title,
      inForceDate,
      applyToAll,
      mainCategory,
      isListed,
      //industries: reference.current,
      industries,
      size
    };
    formData.append("title", obligation.title);
    formData.append("inForceDate", obligation.inForceDate);
    formData.append("applyToAll", obligation.applyToAll);
    formData.append("mainCategory", obligation.mainCategory);
    formData.append("isListed", obligation.isListed);
    formData.append("industries", obligation.industries);
    formData.append("size", obligation.size);
    formData.append("pdfDocument", singleFile);

    // for (const key of formData.keys()) {
    //   console.log("formData keys--->");
    //   console.log(key);
    // }

    // for (const value of formData.values()) {
    //   console.log("formData values--->");
    //   console.log(value);
    // }

    const response = await fetch("/api/obligations", {
      method: "POST",
      //body: JSON.stringify(obligation),
      body: formData,
      headers: {
        //"Content-Type": "multipart/form-data",
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
      setTitle("");
      setInForceDate(null);
      setApplyToAll(true);
      setMainCategory(mainCategory);
      setSingleFile("");
      setError(null);
      setEmptyFields([]);
      console.log("new obligation added", json);
      dispatch({ type: "CREATE_OBLIGATION", payload: json });
    }
  };

  let footer = <p>Please pick a day.</p>;
  if (inForceDate) {
    footer = <p>You picked {format(inForceDate, "PP")}.</p>;
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Obligation</h3>

      <label>Obligation Title:</label>
      <input
        type="text"
        onChange={e => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes("title") ? "error" : ""}
      />

      <label>In-Force Date:</label>
      <DayPicker
        captionLayout="dropdown-buttons"
        fromYear={2015}
        toYear={2025}
        mode="single"
        selected={inForceDate}
        onSelect={setInForceDate}
        footer={footer}
      />

      <h3>Select the general category</h3>

      <div style={{ marginTop: "20px" }}>
        <Select options={options} onChange={handleMainCategoryChange} />
      </div>

      <h3>Select if the obligation apply to all industries or not</h3>

      <label htmlFor="applyToAll">Apply To All Industries</label>
      <input
        id="applyToAll"
        type="radio"
        name="applyToAllIndustries"
        // onChange={e => setApplyToAll(!applyToAll)}
        value="true"
        checked={applyToAll === true}
        className={emptyFields?.includes("applyToAll") ? "error" : ""}
        onChange={onApplyToAllOptionChange}
      />

      <label htmlFor="doesNotApplyToAll">Apply To Specific Industries</label>
      <input
        id="doesNotApplyToAll"
        type="radio"
        name="applyToAllIndustries"
        // onChange={e => setApplyToAll(!applyToAll)}
        value="false"
        checked={applyToAll === false}
        className={emptyFields?.includes("applyToAll") ? "error" : ""}
        onChange={onApplyToAllOptionChange}
      />

      {!applyToAll && (
        <>
          <Select
            styles={{
              menu: (baseStyles, state) => ({
                ...baseStyles,
                fontFamily: "Arial"
              })
            }}
            isMulti
            name="industries"
            options={industryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleIndustriesChange}
          />

          <h3>Select if the obligation apply to listed companies or not</h3>

          <label htmlFor="listed">It is for listed companies</label>
          <input
            id="listed"
            type="radio"
            name="listedCompaniesGroup"
            // onChange={e => setApplyToAll(!applyToAll)}
            value="true"
            checked={isListed === true}
            className={emptyFields?.includes("listed") ? "error" : ""}
            onChange={onListedOptionChange}
          />

          <label htmlFor="notListed">It is for not listed companies</label>
          <input
            id="notListed"
            type="radio"
            name="listedCompaniesGroup"
            // onChange={e => setApplyToAll(!applyToAll)}
            value="false"
            checked={isListed === false}
            className={emptyFields?.includes("listed") ? "error" : ""}
            onChange={onListedOptionChange}
          />

          <h3>Select the size of the company the obligation is applied to:</h3>
          <Select
            name="size"
            options={sizeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSizeChange}
          />
        </>
      )}

      <input type="file" ref={inputRef} onChange={SingleFileChange} />
      {/* <button type="button" onClick={() => uploadSingleFile()}>
        Upload
      </button> */}

      <button id="submitButton">Add Obligation</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ObligationForm;
