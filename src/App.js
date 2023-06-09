import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/Home";
import HomeDpoPage from "./pages/homeDPO/HomeDPO";
import Login from "./pages/login/Login";

import { useAuthContext } from "./hooks/useAuthContext";
import Footer from "./components/footer/Footer";
import "./App.css";
import Signup from "./pages/signup/Signup";
import Editor from "./pages/editor/Editor";
import Universe from "./pages/universe/Universe";
import DpoMyTasks from "./pages/dpo-my-tasks/DpoMyTasks";
import EditorOrganizations from "./pages/editor-organizations/EditorOrganizations";

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
              <Route
                path="/editor-organizations"
                element={
                  user ? <EditorOrganizations /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/universe"
                element={user ? <Universe /> : <Navigate to="/login" />}
              />
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
                  user?.role === "simpleUser" ? (
                    <HomePage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/homeDPO"
                element={
                  user?.role === "dpoUser" ? (
                    <HomeDpoPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/dpoMyTasks"
                element={
                  user?.role === "dpoUser" ? (
                    <DpoMyTasks />
                  ) : (
                    <Navigate to="/login" />
                  )
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
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
