import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <Navbar bg="light" fixed='bottom'>
      <Container>
      <Nav>
        <Nav.Link href="/">How to make an appointment</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/">About us</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/">Privacy Policies</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/">Contact us</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/">Did you find an error?</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  )
}

export default Footer;