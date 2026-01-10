import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function ColorSchemesExample() {
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center">
            <span className="badge bg-success me-2" style={{borderRadius:6, padding:'4px 8px'}}>L</span>
            <span style={{fontWeight:700}}>LMS</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to='/home'>Home</Nav.Link>
              <Nav.Link as={NavLink} to='/book'>Books</Nav.Link>
              <Nav.Link as={NavLink} to='/staff'>Staff</Nav.Link>
              <Nav.Link as={NavLink} to='/member'>Members</Nav.Link>
              <Nav.Link as={NavLink} to='/lending'>Lending</Nav.Link>
              <Nav.Link as={NavLink} to='/contact'>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />

    </>
  );
}

export default ColorSchemesExample;