import styled from "styled-components";

export const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  color:  ${props => props.theme.colors.text};
  border-radius: 10px;
  padding: 10px;

  img{
      max-width: 100%;
      display: block;
      margin-bottom: 10px;
      border-radius: 10px;
  }
  .Deleteicon{
    margin-left: 80px;
  }
  button{
    background-color: ${props => props.theme.colors.background};
    color:  ${props => props.theme.colors.text};
    border: none;
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
  }

`;