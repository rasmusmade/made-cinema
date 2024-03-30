import React, { useState, useEffect } from 'react';
import api from "../../api/axiosConfig";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "./TopMovies.css"; // Make sure your CSS complements React Bootstrap's styling or adjust as necessary

const TopMovies = () => {
    const [topMovies, setTopMovies] = useState([]);

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

    return (
        <Container className="top-movies-container mt-3">
            <Row xs={1} md={4} className="g-4">
                {topMovies.map((movie) => (
                    <Col key={movie.id}>
                        <Card>
                            <Card.Img variant="top" src={movie.posterurl} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.genre}</Card.Text>
                                <Button variant="primary" className="choose-screening-btn">Choose Screening</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TopMovies;