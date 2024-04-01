import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';

//Header component using Bootstrap's navbar. Template taken from https://getbootstrap.com/docs/4.0/components/navbar/ and later styled and modifyed by me
function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
            <Container>
                <Navbar.Brand href="/" className="navbar-brand-custom">KINO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto custom-nav">
                        <Nav.Link href="/">Films</Nav.Link>
                        <Nav.Link href="/screenings">Screenings</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>Log in</Nav.Link>
                        <Nav.Link>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
