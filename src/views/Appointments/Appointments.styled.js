import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

export const ApptCard = styled(Card)`
  width: 200px;
  height: 170px;
  margin: 15px;

  @media (max-width: 575.98px) {
    &{
      width: calc(100% - 30px);
    }
  }

  &.confirmed{
    background-color: #d1e7dd;
    border-color: #a3cfbb;
  }
  &.notConfirmed{
    background-color: #cfe2ff;
    border-color: #9ec5fe;
  }
`;

export const ConfirmedSign = styled(Card.Text)`
  color: green;
  font-size: 18px;
  font-weight: 500;
`;

export const AppointmentsContainer = styled.div`
  min-height: calc(100vh - 140px);
  padding-left: 10px;
  padding-right: 10px;
  max-width: 1000px;
  margin: auto;
  display: ruby-text;
`;