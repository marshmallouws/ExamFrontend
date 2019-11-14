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
    <div>
      <h2>Login</h2>
      <form onSubmit={login} onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button>Login</button>
      </form>
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