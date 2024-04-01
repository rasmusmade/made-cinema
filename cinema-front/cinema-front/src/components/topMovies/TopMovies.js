import React, { useState, useEffect } from 'react';
import api from "../../api/axiosConfig";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'; // Import Form for the select input
import "./TopMovies.css";
import { useNavigate } from "react-router-dom";

const TopMovies = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('All'); // State to keep track of the selected genre
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopMovies = async () => {
            try {
                const response = await api.get('/topmovies');
                setTopMovies(response.data);
            } catch (error) {
                console.error("Failed to fetch top movies:", error);
            }
        };

        fetchTopMovies();
    }, []);

    const handleChooseScreening = (movieId) => {//Function to navigate to screenings page for a selected movie
        navigate(`/screenings/${movieId}`);
    };


    const genres = ['All', ...new Set(topMovies.map(movie => movie.genre))]; //Extract all unique genres


    const filteredMovies = topMovies.filter(movie => selectedGenre === 'All' || movie.genre === selectedGenre); //Filter movies by selected genre

    return (
        <Container className="top-movies-container">
            <Row className="mb-4">
                <Col>
                    <Form.Select
                        aria-label="Genre select"
                        value={selectedGenre}
                        onChange={e => setSelectedGenre(e.target.value)}
                    >
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row xs={1} md={4} className="g-4">
                {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
                    <Col key={movie.id}>
                        <Card className="d-flex flex-column">
                            <Card.Img variant="top" src={movie.posterurl} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-black">{movie.title}</Card.Title>
                                <Card.Text className="text-black">{movie.genre}</Card.Text>
                                <Button variant="primary" onClick={() => handleChooseScreening(movie.id)} className="choose-screening-btn">Choose Screening</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : (
                    <Col>No movies available in this genre.</Col>
                )}
            </Row>
        </Container>
    );
};

export default TopMovies;