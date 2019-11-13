import React, { useState } from "react"
import facade from "./apifacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  }

  const login = (user, pass) => {
    facade.login(user, pass).then(res => setLoggedIn(true));
  }

  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
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
  const [dataFromServer, setDataFromServer] = useState("Fetching!!");
  return (
    <div>
      <h2>Data recieved</h2>
      <h3>{dataFromServer}</h3>

    </div>
  )
}

export default App;