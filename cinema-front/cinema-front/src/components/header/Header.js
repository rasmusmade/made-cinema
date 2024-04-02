import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';

//Header component using Bootstrap's navbar. Template taken from https://getbootstrap.com/docs/4.0/components/navbar/ and later styled and modifyed by me
function Header() {
    const handleLogin = () => {
        console.log('Login clicked');
    };

    const handleRegister = () => {
        console.log('Register clicked');
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="/" className="brand-custom">KINO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="custom-nav">
                        <Nav.Link href="/">Films</Nav.Link>
                        <Nav.Link href="/screenings">Screenings</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link className="login" onClick={handleLogin}>Log in</Nav.Link>
                        <Nav.Link className="register" onClick={handleRegister}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
