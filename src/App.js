import React, { useState } from "react"
import facade from "./apifacade";
import Navbar from "./Navbar";
import Login from "./Login";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState("");

  const logInState = (r, u) => {
    setRoles(r);
    setUsername(u);
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login logInState={logInState} />
        </Route>
        <PrivateRoute path="/user" component={LoggedIn} roles={roles} username={username} />
      </Switch>
    </Router>
  );
}

function PrivateRoute({component: Component, roles, username, ...rest}) {
  return (
    <Route 
      {...rest}
      render={(props) => facade.getToken() != null
        ? <Component {...props} roles={roles} username={username} />
        : <Redirect to={{pathname: "/login", state: { from: props.location}}} />
      }
      />
  )
}

function Home() {
  return (
    <div>
    <div className="data-wrapper centered-text">
      <h1>Quick start project</h1>
      <p>Quickstart project includes login-functionality and protected routes</p>
    </div>

      <ul className="data-wrapper info-box">
        <li> - Install JavaScript editor</li>
        <li> - Clone project from https://github.com/marshmallouws/CA3Frontend.git</li>
        <li> - In root folder of cloned project, <b>type npm install</b> to install dependencies</li>
        <li> - Open project in VS Code</li>
        <li> - Type <b>npm start</b> to run the project</li>
      </ul>
      </div>
    
  );
}

function LoggedIn(props) {
  const { roles, username } = props;
  return (
    <div className="data-wrapper">
      <div className="info-box">
        <h2 className="headline">Logged in as {username}</h2>
        <h4>Roles:</h4>
        {
          roles.map((elem, index) => (<h5 key={index}>{elem}</h5>))
        }
      </div>
    </div>
  )
}

export default App;