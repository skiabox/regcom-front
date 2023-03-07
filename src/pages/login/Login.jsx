import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    passsword: undefined
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  //handlers
  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    //just updates the loading state
    dispatch({ type: "LOGIN_START" });
    try {
      const stringifiedCredentials = JSON.stringify(credentials);
      const options = {
        headers: { "content-type": "application/json" }
      };
      const res = await axios.post(
        "/wp-json/jwt-auth/v1/token",
        stringifiedCredentials,
        options
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      if (res.data.user_nicename === "stavros-kefaleas") {
        navigate("/");
      } else {
        navigate("/homeDPO");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} className="lButton" onClick={handleClick}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
