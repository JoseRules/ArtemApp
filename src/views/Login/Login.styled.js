import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

export const LoginContainer = styled(Container)`
  display: block;
  justify-content: center;
  width: 25%;
  min-width: 320px;
  margin-top: 100px;
`;

export const PageContainer = styled(Container)`
  display: flex;
  height: calc(100vh - 112px);
`;

export const ArtemLogo = styled(Image)`
  display: block;
  width: 86px;
  margin-left: calc(50% - 43px);
`;