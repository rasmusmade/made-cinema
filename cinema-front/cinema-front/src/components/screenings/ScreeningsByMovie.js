import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../api/axiosConfig";
import Container from "react-bootstrap/Container";
import {Button, Card, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const ScreeningsByMovie = () => {
    const [screenings, setScreenings] = useState([]);
    const { movieId } = useParams();
    const [movie, setMovie] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const response = await api.get(`http://localhost:8080/screenings/${movieId}`);
                setScreenings(response.data);
            } catch (error) {
                console.error("Failed to fetch screenings:", error);
            }
        };

        fetchScreenings();
    }, [movieId]);

    useEffect(() => {
        const fetchMovieById = async () => {
            try {
                const response = await api.get(`http://localhost:8080/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Failed to fetch movie:", error);
            }
        };

        fetchMovieById();
    }, [movieId]);

    const handleBuyTicketClick = (screening) => {
        navigate('/ticket', { state: { screening: screening, movie: movie } });}

    return (
        <Container>
            {screenings.map((screening) => (
                <Row key={screening.id} className="mb-3">
                    <Card className="d-flex flex-row">
                        <div className="w-25">
                            <Card.Img
                                variant="left"
                                src={movie.posterurl}
                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                            />
                        </div>
                        <Card.Body className="d-flex justify-content-between align-items-center flex-grow-1" style={{ paddingLeft: '20px' }}>
                            <div className="card-content" style={{marginLeft: '0'}}>
                                <Card.Title className="card-title">{movie.title}</Card.Title>
                                <Card.Text className="card-text">{movie.genre}</Card.Text>
                                <Card.Text className="card-text">{movie.pg}</Card.Text>
                                <Card.Text className="card-text">{screening.startDate}</Card.Text>

                            </div>
                            <Card.Text>{screening.start_time}</Card.Text>
                            <Button variant="primary" onClick={() => handleBuyTicketClick(screening)}>Buy Ticket</Button>
                        </Card.Body>
                    </Card>
                </Row>
            ))}
        </Container>
    );
};

export default ScreeningsByMovie;