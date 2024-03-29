import React, { useState, useEffect } from 'react';
import api from "../../api/axiosConfig";
import "./TopMovies.css"

const TopMovies = () => {
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        const fetchTopMovies = async () => {
            try {
                const response = await api.get('/topmovies');
                setTopMovies(response.data); // Assuming the endpoint returns more than 4, we slice it
            } catch (error) {
                console.error("Failed to fetch top movies:", error);
            }
        };

        fetchTopMovies();
    }, []);

    return (
        <div className="top-movies-container">
            {topMovies.map(movie => (
                <div key={movie.id} className="movie">
                    <div className="movie-poster" style={{ backgroundImage: `url(${movie.posterurl})` }}></div>
                    <h3>{movie.title}</h3>
                    <p>{movie.genre}</p>
                    <button className="choose-screening-btn">Choose Screening</button>
                </div>
            ))}
        </div>
    );
};

export default TopMovies;