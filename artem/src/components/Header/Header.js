import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/Artem.png';
import { LoginButton, SignUpButton, ArtemLogo } from './Header.styled';
import { useUser, useUpdateUser } from '../../store/UserContext';
import { useNavigate } from 'react-router-dom';
import { saveSessionStorage } from '../../utils/getSessionStorage';
import { initialUserState } from '../../utils/initialValues';

function Header() {
  const userData = useUser();
  const updateUser = useUpdateUser();
  const { type, firstname, lastname } = userData.userInfo;
  const navigate = useNavigate();
  const handleLogOut = () => {
    updateUser(initialUserState);
    saveSessionStorage(initialUserState);
    return navigate('/login')
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <ArtemLogo src={logo} width={40}/>
        <Navbar.Brand href="/">Artem</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!!type && <Nav.Link href="/profile">Profile</Nav.Link>}
            {type === 'patient' && <Nav.Link href="/catalog">Catalog</Nav.Link>}
            {type === 'patient' && <Nav.Link href="/appointments">Appointments</Nav.Link>}
            {type === 'doctor' && <Nav.Link href="/calendar">Calendar</Nav.Link>}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {!type && <Nav className="ms-auto">
            <LoginButton variant="outline-success" href="login">Login</LoginButton>
            <SignUpButton variant="outline-success" href="signUp">Sign Up</SignUpButton>
          </Nav>}
          {!!type && <Nav className="ms-auto">
            <Badge bg='light' text="dark" style={{padding: '5px 15px', fontSize: '17px', lineHeight: '28px', margin: '0 10px', fontWeight: '500'}}>Hello {firstname} {lastname}</Badge>
            <SignUpButton variant="outline-success" onClick={handleLogOut}>Log out</SignUpButton>
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;