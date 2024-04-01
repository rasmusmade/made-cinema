import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import "./TicketPurchased.css";

const TicketPurchased = () => {
    //Hook
    const navigate = useNavigate();
    const goToHome = () => {//Function to take the user home after they click on the bitton
        navigate('/');
    };

    return (
        <div >
            <div className="purchased-ticket" >
                <p className="display-4">Tickets purchased successfully!</p>
                <Button variant="primary" className="button" onClick={goToHome}>Go home</Button>
            </div>
        </div>
    );
};

export default TicketPurchased;