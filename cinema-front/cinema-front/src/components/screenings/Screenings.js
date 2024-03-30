import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './Screenings.css';
import { useNavigate } from 'react-router-dom';


const Screenings = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [screenings, setScreenings] = useState([]);
    const [movies, setMovies] = useState([]);
    const [filteredScreenings, setFilteredScreenings] = useState([]);
    const navigate = useNavigate();
    const handleBuyTicketClick = (screening) => {
        navigate('/ticket', { state: { screening: screening, movie: screening.movie } });}

    useEffect(() => {

        const fetchMovies = async () => {
            const response = await axios.get('http://localhost:8080/topmovies');
            setMovies(response.data);
        };

        fetchMovies();
    }, []);

    useEffect(() => {

        const fetchScreenings = async () => {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:8080/screenings?date=${formattedDate}`);
            setScreenings(response.data);
        };

        fetchScreenings();
    }, [selectedDate]);

    useEffect(() => {

        const moviesById = movies.reduce((acc, movie) => {
            acc[movie.id] = movie;
            return acc;
        }, {});


        const result = screenings
            .filter(screening => new Date(screening.startDate).toDateString() === selectedDate.toDateString())
            .map(screening => {
                return { ...screening, movie: moviesById[screening.movie_id] };
            });
        setFilteredScreenings(result);
    }, [screenings, movies, selectedDate]);

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                </Col>
            </Row>

            {filteredScreenings.length > 0 ? (
                filteredScreenings.map((screening) => (
                    <Row key={screening.id} className="mb-3">
                        <Card className="d-flex flex-row">
                            <div className="w-25">
                                <Card.Img
                                    variant="left"
                                    src={screening.movie.posterurl}
                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </div>
                            <Card.Body className="d-flex justify-content-between align-items-center flex-grow-1" style={{ paddingLeft: '20px' }}>
                                <div className="card-content" style={{marginLeft: '0'}}>
                                    <Card.Title className="card-title">{screening.movie.title}</Card.Title>
                                    <Card.Text className="card-text">{screening.movie.genre}</Card.Text>
                                    <Card.Text className="card-text">{screening.movie.pg}</Card.Text>
                                </div>
                                <Card.Text>{screening.start_time}</Card.Text>
                                <Button variant="primary" onClick={() => handleBuyTicketClick(screening)}>Buy Ticket</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                ))
            ) : (
                <Row>
                    <Col>
                        <p>No screenings available for the selected date.</p>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Screenings;