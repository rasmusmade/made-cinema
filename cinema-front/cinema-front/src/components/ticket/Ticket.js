import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import './Ticket.css';

const Ticket = () => {
    const [ticketType, setTicketType] = useState('');
    const location = useLocation();
    const { movie, screening } = location.state || {};


    const handleTicketTypeSelection = (type) => {
        setTicketType(type);
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
        <Container className="mt-3 ticket-purchase">
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={movie.posterurl} />
                    </Card>
                </Col>
                <Col md={8}>
                    <div className="content-indented">
                    <h2>{movie.title}</h2>
                    <p>Genre: {movie.genre}</p>
                    <p>Director: {movie.director}</p>
                    <p>Synopsis: {movie.info}</p>
                    <p>Screening Time: {screening.start_time}</p>
                    <p>Rating: {movie.pg}</p>
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={4}>
                    <Dropdown onSelect={handleTicketTypeSelection}>
                        <Dropdown.Toggle variant="success" id="dropdown-ticket-type">
                            {ticketType || "Select Ticket Type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Regular">Regular</Dropdown.Item>
                            <Dropdown.Item eventKey="Reduced">Reduced Price</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={8}>
                    <Button
                        variant="primary"
                        disabled={!ticketType}
                        onClick={() => alert('Proceed to seat selection')}>
                        Choose Seats
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Ticket;