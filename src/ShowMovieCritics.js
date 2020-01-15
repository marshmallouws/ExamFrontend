import React, { useState } from "react"

function ShowMovieCritics({movie}) {
    return (
        <div>
            <div className="data-wrapper">
                <h1>Title: {movie.title} </h1>
                <table>
                    <tbody>
                        <tr><th>Year</th><td>{movie.year}</td></tr>
                        <tr><th>Director(s)</th><td>{movie.directors}</td></tr>
                        <tr><th>Cast</th><td>{movie.cast}</td></tr>
                        <tr><th>Genre(s)</th><td>{movie.genres}</td></tr>
                        <tr><th>Imdb Rating</th><td>{movie.imdb.imdbRating}</td></tr>
                        <tr><th>Imdb Votes</th><td>{movie.imdb.imdbVotes}</td></tr>
                    </tbody>
                </table>
                <br/>
                <b>Rotten tomatoes</b><br/>
                Critics
                <table>
                    <tbody>
                        <tr><th>Rating</th><td>{movie.tomato.critic.rating}</td></tr>
                        <tr><th>Number of Ratings</th><td>{movie.tomato.critic.numReviews}</td></tr>
                        <tr><th>Meter</th><td>{movie.tomato.critic.meter}</td></tr>
                    </tbody>
                </table>
                Viewers
                <table>
                    <tbody>
                        <tr><th>Rating</th><td>{movie.tomato.viewer.rating}</td></tr>
                        <tr><th>Number of Ratings</th><td>{movie.tomato.viewer.numReviews}</td></tr>
                        <tr><th>Meter</th><td>{movie.tomato.viewer.meter}</td></tr>
                    </tbody>
                </table>
            </div>
            <div>
            </div>
            <div className="data-wrapper" >
                <img src={movie.poster} width="40%" height="40%"></img>
            </div>
        </div>
    )
}

var movie = 
{
    "imdb": {
        "imdbRating": 7.0,
        "imdbVotes": 135753
    },
    "tomato": {
        "critic": {
            "rating": 7.8,
            "numReviews": 55.0,
            "meter": 89.0
        },
        "source": "tomatoes",
        "viewer": {
            "rating": 3.4,
            "numReviews": 139692.0,
            "meter": 70.0
        }
    },
}



export default ShowMovieCritics;