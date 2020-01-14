import React, { useState, useEffect } from "react"
import facade from "./apifacade";
import {
    Redirect,
  } from "react-router-dom";



function Home(props) {
    const[title, setTitle] = useState("");
    const[redirect, setRedirect] = useState(false);
    const[error, setError] = useState("");
    
    const onChange = (event) => {
        setTitle(event.target.value);
    }

    const onClick = (evt) => {
        evt.preventDefault();
        facade.simpleMovie(title)
            .then(data => {props.setMovie(data); setRedirect(true); console.log(data)})
            .catch(err => {
                console.log(err.info);
                setError(err);
            });
    }

    if(redirect) {
        return <Redirect to={{pathname: `/movie/${title}`}} />
    }

    return (
        <div>
            <div className="data-wrapper">
                <h1>Movie Database</h1>
                <p>Search for movies</p>
                <form className="form-signin" onSubmit={onClick}>
                    <input id="title" onChange={onChange} className="form-control" type="text" placeholder="Type name of movie"></input>
                    <br />
                    <button className="btn btn-primary">Search</button>
                </form>
            </div>
        </div>
    );
}

export default Home;

