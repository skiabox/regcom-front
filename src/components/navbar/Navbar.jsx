import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { ReactComponent as GtRegComLogo } from "../../assets/logo.svg";
import { ReactComponent as UserAvatar } from "../../assets/user.svg";
import { useLogout } from "../../hooks/useLogout";

const Navbar = ({ type }) => {
  const { logout } = useLogout();
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <GtRegComLogo />
        </Link>
        {user?.role === "simpleUser" && (
          <nav>
            <ul>
              <li>
                <NavLink end to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="my-tasks">My Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/universe">Regulatory Universe</NavLink>
              </li>
              <li>
                <Link onClick={handleClick}>Logout</Link>
              </li>
            </ul>
            <UserAvatar />
          </nav>
        )}
        {user?.role === "dpoUser" && (
          <nav>
            <ul>
              <li>
                <NavLink end to="/homeDPO">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dpoMyTasks">My Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/universe">Regulatory Universe</NavLink>
              </li>
              <li>
                <Link onClick={handleClick}>Logout</Link>
              </li>
            </ul>
            <UserAvatar />
          </nav>
        )}
        {user?.role === "editor" && (
          <nav>
            <ul>
              <li>
                <NavLink to="/editor">Home</NavLink>
              </li>
              <li>
                <NavLink to="/editor-organizations">Organizations</NavLink>
              </li>
              <li>
                <NavLink to="/universe">Regulatory Universe</NavLink>
              </li>
              <li>
                <Link onClick={handleClick}>Logout</Link>
              </li>
            </ul>
            <UserAvatar />
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
