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

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <GtRegComLogo />
        </Link>
        {user ? (
          <nav>
            <ul>
              <li>
                <NavLink exact="true" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="my-tasks">My Tasks</NavLink>
              </li>
            </ul>
            <UserAvatar />
          </nav>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
