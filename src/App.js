import React, { useState, useEffect } from "react"
import facade from "./apifacade";
import Navbar from "./Navbar";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link
} from "react-router-dom";

function App() {
  const [roles, setRoles] = useState([]);

  const logInState = (r) => {
    setRoles(r);
  }

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login logInState={logInState} />
        </Route>
        <PrivateRoute path="/user" component={LoggedIn} roles={roles} />
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, roles: roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => facade.getToken() != null
        ? <Component {...props} roles={roles} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
  )
}

function Home() {
  return (
    <div>Home</div>
  );
}

function LoggedIn(props) {
  const { roles } = props;
  const [dataFromServer, setDataFromServer] = useState("Fetching!!");
  return (
    <div>
      <h2>Data recieved</h2>
      <h3>{dataFromServer}</h3>
      <h4>Roles</h4>
      {
        roles.map((elem, index) => (<h5 key={index}>{elem}</h5>))
      }
    </div>
  )
}

export default App;