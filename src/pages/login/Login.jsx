import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //grab what we want from useLogin hook
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  //handlers
  const handleSubmit = async e => {
    console.log("inside Login.jsx handleSubmit");
    e.preventDefault();

    const res = await login(email, password);
    console.log("res from login(email, password) in Login.jsx", res);
    if (res.role === "editor") {
      navigate("/editor");
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <p>Είσοδος Χρήστη</p>

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

      <p id="forgotPassword">Ξέχασα τον κωδικό μου</p>

      <label id="labelRememberMe">Να με θυμάσαι</label>
      <input type="checkbox" id="rememberMe" />

      <button disabled={isLoading}>Είσοδος</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
