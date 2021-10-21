
import { Navbar, Container, Nav } from 'react-bootstrap';

export function AppNav() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="#home">Race Timer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Races</Nav.Link>
                        <Nav.Link href="/runners">Runners</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default AppNav;
