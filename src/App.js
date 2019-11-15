import React, { useState } from "react"
import facade from "./apifacade";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedIn = (state) => {
    setIsLoggedIn(state);
  }

  return(
    <Router>
    <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/login">
          <LogIn setIsLoggedIn={setIsLoggedIn}/>
        </Route>
        <PrivateRoute path="/test">
          <Test/>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function Navbar() {
  return(
    <nav className="header">
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => fakeAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}

function Test() {
  return(
    <div>Private!</div>
  )
}

function Home() {
  return(
    <div>Home</div>
  );
}

/*
function Login(props) {
  //const [loggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);
  const [err, setErr] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  }

  const setErrorMsg = (msg) => {
    setErr(msg);
  }

  const login = (user, pass) => {
    facade.login(user, pass)
      .then(data => {setRoles(data.roles); props.setIsLoggedIn(true)})
      .catch(err => {
        setErrorMsg("Wrong username or password");
      });
  }

  return (
    <div> 
      {!loggedIn ? (<div><LogIn login={login} setErrorMsg={setErrorMsg} /><p>{err}</p></div>) :
        (<div>
          <LoggedIn roles={roles} />
          <button onClick={logout}>Logout</button>
        </div>)}
    </div>
  )
}  */

function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [roles, setRoles] = useState([]);
  /*
  const login = (event) => {
    event.preventDefault();
    props.login(username, password);
  } */

  const login = (event) => {
    event.preventDefault();
    facade.login(username, password)
      .then(data => {setRoles(data.roles); props.setIsLoggedIn(true)})
      .catch(err => {
        setErr("Wrong username or password");
    });
  }

  const onChange = (event) => {
    setErr("");
    if (event.target.id === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  return (

    <div className="container container-small">
    <div className="wrapper">
    <h2>Login</h2><br/>
      <form className="form-signin" onSubmit={login} onChange={onChange} >
        <div className="form form-group">
        <input className="form-control" placeholder="User Name" id="username" />
        </div><div className="form-group">
        <input className="form-control" placeholder="Password" id="password" /> <br/>
        <button className="btn btn-primary">Login</button>
        </div>
      </form>
      </div>
    </div>
  )
}

function LoggedIn(props) {
  const {roles} = props;
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