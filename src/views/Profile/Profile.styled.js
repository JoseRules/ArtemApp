import styled from "styled-components"
import Card from 'react-bootstrap/Card';

export const ProfileContainer = styled.div`
  min-height: calc(100vh - 140px);
  padding-left: 10px;
  padding-right: 10px;
`;

export const ProfileCard = styled(Card)`
  max-width: 750px;
  margin: 0 auto;
  margin-top: 25px;
`;

export const CardHeading = styled.div`
  display: grid;
`;

export const Image = styled(Card.Img)`
  margin: 20px auto;
  width: 220px;
  border-radius: 50%;
`;

export const Title = styled(Card.Title)`
  margin: 0 auto;
  margin-top: 25px;
`;

export const LeftColumn = styled.td`
  width: 115px;
  font-weight: bold;
`;