import React, { useState } from "react"

function ShowMovie({ movie }) {

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
                        <tr><th>Plot</th><td>{movie.plot}</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="data-wrapper" >
                <img src={movie.poster} width="40%" height="40%"></img>
            </div>
        </div>
    )
}

export default ShowMovie;



