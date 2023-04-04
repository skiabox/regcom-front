import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import HomeDPO from "./pages/homeDPO/HomeDPO";
import Login from "./pages/login/Login";

import { useAuthContext } from "./hooks/useAuthContext";
import Footer from "./components/footer/Footer";
import "./App.css";
import Signup from "./pages/signup/Signup";
import Editor from "./pages/editor/Editor";
import Universe from "./pages/universe/Universe";

function App() {
  const { user } = useAuthContext();

  console.log("user: ", user);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="main-content">
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/universe" element={<Universe />} />
              <Route
                path="/editor"
                element={
                  user?.role === "editor" ? (
                    <Editor />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/"
                element={
                  user?.role === "dpoUser" ? <Home /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              {/* <Route path="/" element={<Home />} />
              <Route path="/homeDPO" element={<HomeDPO />} />
              <Route path="/login" element={<Login />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
