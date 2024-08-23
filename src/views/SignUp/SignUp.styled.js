import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';

export const FormHeading = styled(Form.Group)`
  justify-content: center;
  display: flex;
`;

export const FormTitle = styled(Form.Text)`
  font-size: xx-large;
  display: block;
  text-align: center;
`;

export const LoginRedirect = styled(Form.Text)`
  font-size: large;
  display: block;
  text-align: center;
  a {
    text-decoration: none;
  }
  a:hover{
    text-decoration: underline;
  }
`;

export const CenteredCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserTypeRow = styled(Row)`
  display: grid;
  justify-content: center;
  text-align: center;
`;

export const SignUpContainer = styled(Container)`
  margin-bottom: 80px;
`;

export const MobileDivider = styled.span`
  display: none;
  @media (max-width: 767px) {
    height: 10px;
    display: block;
  }
`;
