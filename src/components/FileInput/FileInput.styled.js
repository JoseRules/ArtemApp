import styled from "styled-components";

export const InputStyled = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const FileContainer = styled.div`
  position: relative;
  padding: 10px;
  width: 250px;
  background-color: #0d6efd;
  border-radius: 5px;
  &.inputContainer:hover{
    background-color: #0b5ed7;
  }
  &.inputContainer:active{
    background-color: #0a58ca;
  }
`;

export const TextStyled = styled.p`
  text-align: center;
  text-justify: center;
  color: white;
  margin-bottom: 0;
`;