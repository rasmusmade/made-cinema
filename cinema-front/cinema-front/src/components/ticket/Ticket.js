import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import "./Ticket.css"
import tomatometerIcon from "../topMovies/Rotten_Tomatoes.svg.png";

const Ticket = () => {
    //States
    const [ticketType, setTicketType] = useState('');
    const [ticketQuantity, setTicketQuantity] = useState(0);
    //Navigation hooks
    const location = useLocation();
    const { movie, screening } = location.state || {};
    const navigate = useNavigate();

    //Ticket prices
    const ticketPrices = {
        Regular: 10,
        "Reduced": 5,
    };

    const navigateToSeatSelector = () => {
        const ticketPrice = ticketType ? ticketPrices[ticketType] : 0;// Determine the ticket price based on the selected ticket type

        navigate('/ticket/seatSelector', {//Passing info to the seatselector
            state: {
                movie: movie,
                screening: screening,
                ticketType: ticketType,
                ticketQuantity: ticketQuantity,
                ticketPrice: ticketPrice
            }
        });
    };

    const handleTicketTypeSelection = (type) => {
        setTicketType(type);
    };

    const handleTicketQuantitySelection = (quantity) => {
        setTicketQuantity(quantity);
    };

    if (!movie || !screening) {
        return (
            <Container>
                <Row>
                    <Col>No movie or screening selected.</Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="ticket-purchase">
            <Row className="mt-3">
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={movie.posterurl} />
                    </Card>
                </Col>
                <Col md={8} className="d-flex flex-column justify-content-between">
                    <div>
                        <h2 style={{fontWeight: 'bold', fontSize: '24px'}}>{movie.title}</h2>
                        <p><strong>Genre:</strong> {movie.genre}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Synopsis:</strong> <span style={{
                            display: 'block',
                            marginLeft: '20px',
                            textIndent: '-0px',
                            marginTop: '10px'
                        }}>{movie.info}</span></p>
                        <p><strong>Screening Time:</strong> {screening.start_time}</p>
                        <p><strong>Rating:</strong> {movie.pg}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                        <p><strong>Tomatometer:</strong> {movie.tomatometer} <img src={tomatometerIcon}
                                                                                  alt="Tomatometer"
                                                                                  style={{
                                                                                      width: '20px',
                                                                                      height: '20px',
                                                                                      marginRight: '5px'
                                                                                  }}/></p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Dropdown onSelect={handleTicketTypeSelection} className="mx-2">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {ticketType || "Select Ticket Type"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Regular">Regular</Dropdown.Item>
                                <Dropdown.Item eventKey="Reduced">Reduced Price</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown onSelect={handleTicketQuantitySelection} className="mx-2">
                            <Dropdown.Toggle variant="success" id="dropdown-ticket-quantity">
                                {ticketQuantity || "Number of Tickets"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <Dropdown.Item eventKey={i + 1} key={i + 1}>{i + 1}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            variant="primary"
                            disabled={!ticketType || ticketQuantity === 0}
                            onClick={navigateToSeatSelector}
                            className="mx-2">
                            Choose Seats
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Ticket;