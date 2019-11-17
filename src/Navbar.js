import React, { useState, useEffect } from "react"
import facade from "./apifacade";
import {
  NavLink,
  Link
} from "react-router-dom";

function Navbar(props) {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);
  
    const logout = () => {
      facade.logout();
      userHasAuthenticated(false);
    }
  
    useEffect(() => {
      onLoad();
    }, []);
  
    function onLoad() {
      userHasAuthenticated(true);
      setIsAuthenticating(false);
    }
  
    return (
      !isAuthenticating &&
      <nav className="header">
        <ul>
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/user">Roles</NavLink>
          </li>
  
          {facade.getToken() == null ? (<li style={{ float: "right" }}>
            <Link to="/login">Log in</Link>
          </li>) : (<li style={{ float: "right" }}><Link to="/" onClick={logout}>Log out</Link></li>)
          }
  
        </ul>
      </nav>
    );
  }

  export default Navbar;