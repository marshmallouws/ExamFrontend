import React, { useState } from "react"
import facade from "./apifacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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
      .then(data => {setRoles(data.roles); setLoggedIn(true)})
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
}

function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    props.login(username, password);
  }

  const onChange = (event) => {
    props.setErrorMsg("");
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

/*
form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
*/

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