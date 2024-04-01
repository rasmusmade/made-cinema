import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './Screenings.css';
import { useNavigate } from 'react-router-dom';

//Screenings component that displays screenings
const Screenings = () => {
    //States
    const [selectedDate, setSelectedDate] = useState(new Date('2024-04-01'));
    const [screenings, setScreenings] = useState([]);
    const [movies, setMovies] = useState([]);
    const [filteredScreenings, setFilteredScreenings] = useState([]);
    //Hook for navigating
    const navigate = useNavigate();


    const formatDate = (date) => { //Function to make the dates more readable in the dropdown menu.
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };


    const dates = Array.from({ length: 7 }, (_, i) => { //Function that generates an array for the 7 days starting from 1st of april.
        const date = new Date('2024-04-01');
        date.setDate(date.getDate() + i);
        return formatDate(date);
    });

    useEffect(() => { //Fetching the movies from backend
        const fetchMovies = async () => {
            const response = await axios.get('http://localhost:8080/topmovies');
            setMovies(response.data);
        };

        fetchMovies();
    }, []);

    useEffect(() => { //Fetching screenings by date, does it every time the date changes
        const fetchScreenings = async () => {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:8080/screeningsbydate?date=${formattedDate}`);
            setScreenings(response.data);
        };

        fetchScreenings();
    }, [selectedDate]);

    useEffect(() => {
        const moviesById = movies.reduce((acc, movie) => { //Mapping object for movies for better access
            acc[movie.id] = movie;
            return acc;
        }, {});

        const result = screenings
            .map(screening => {
                return { ...screening, movie: moviesById[screening.movieId] }; //Attaching movie details for each screening
            });
        setFilteredScreenings(result);
    }, [screenings, movies, selectedDate]);

    const handleBuyTicketClick = (screening) => { //Function to what happens when the user clikcs on the buy ticket button
        navigate('/ticket', { state: { screening: screening, movie: screening.movie } });
    };

    return (
        <Container>
            <Row className="mb-3">
                <Col className="selektbox">
                    <select
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="form-select"
                    >
                        {dates.map((date, index) => {
                            const dateValue = new Date('2024-04-01');
                            dateValue.setDate(dateValue.getDate() + index);
                            return (
                                <option key={index} value={dateValue.toISOString().split('T')[0]}>
                                    {date}
                                </option>
                            );
                        })}
                    </select>
                </Col>
            </Row>
            {filteredScreenings.length > 0 && movies.length > 0 ? (
                filteredScreenings.map((screening) => (
                    <Row key={screening.id} className="mb-3">
                        <Card className="d-flex flex-row">
                            <div className="w-25">
                                <Card.Img
                                    variant="left"
                                    src={screening.movie?.posterurl || 'defaultPosterUrlHere'} // Use optional chaining and provide a default URL
                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </div>
                            <Card.Body className="d-flex justify-content-between align-items-center flex-grow-1" style={{ paddingLeft: '20px' }}>
                                <div className="card-content" style={{marginLeft: '0'}}>
                                    <Card.Title className="card-title">{screening.movie?.title || 'Unknown Title'}</Card.Title>
                                    <Card.Text className="card-text">{screening.movie?.genre || 'Unknown Genre'}</Card.Text>
                                    <Card.Text className="card-text">{screening.movie?.pg || 'Rating Not Available'}</Card.Text>
                                </div>
                                <Card.Text>{screening.start_time}</Card.Text>
                                <Button variant="primary" className="button" onClick={() => handleBuyTicketClick(screening)}>Buy Ticket</Button>
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
};

export default Screenings;