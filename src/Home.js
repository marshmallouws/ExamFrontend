import React, { useState, useEffect } from "react"
import facade from "./apifacade";
import {
    Redirect,
} from "react-router-dom";



function Home(props) {
    const [title, setTitle] = useState("");
    const [redirect, setRedirect] = useState("");
    const [error, setError] = useState("");

    const onChange = (event) => {
        setTitle(event.target.value);
    }

    const onClick = (evt) => {
        evt.preventDefault();
        if (facade.getToken() != null) {
            facade.movieAll(title)
                .then(data => { props.setMovie(data); setRedirect("all"); console.log(data) })
                .catch(err => {
                    console.log(err.info);
                    setError(err);
                });
        } else {
            facade.simpleMovie(title)
                .then(data => { props.setMovie(data); setRedirect("simple")})
                .catch(err => {
                    console.log(err.info);
                    setError(err);
                });
        }
    }

    if (redirect === "simple") {
        return <Redirect to={{ pathname: `/movie/${title}` }} />
    } else if (redirect === "all") {
        return <Redirect to={{ pathname: `/movieCritic/${title}`}}/>
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

