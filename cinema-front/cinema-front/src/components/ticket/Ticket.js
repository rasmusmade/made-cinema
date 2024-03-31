import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import "./Ticket.css"

const Ticket = () => {
    const [ticketType, setTicketType] = useState('');
    const [ticketQuantity, setTicketQuantity] = useState(0);
    const location = useLocation();
    const { movie, screening } = location.state || {};
    const navigate = useNavigate();
    const navigateToSeatSelector = () => {
        navigate('/ticket/seatSelector', { state: { movie: movie, screening: screening, ticketType: ticketType, ticketQuantity: ticketQuantity }});
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
                        <h2>{movie.title}</h2>
                        <p>Genre: {movie.genre}</p>
                        <p>Director: {movie.director}</p>
                        <p>Synopsis: {movie.info}</p>
                        <p>Screening Time: {screening.start_time}</p>
                        <p>Rating: {movie.pg}</p>
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