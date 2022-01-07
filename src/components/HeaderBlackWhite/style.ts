import styled from 'styled-components';

export const ConatinerBlackWhite = styled.div`
    height: 60px;
    background-color:  ${props => props.theme.colors.primary};
    color:  #808080;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 15px;
    h1{
        font-size: 20px;
    }
    button{
        display: block;
        margin-right: 8%;
        background-color: transparent;
        padding: 5px;
        color: #808080;
        border: 1px solid #808080;
        border-radius: 15px;
    }
    span{
        margin-left: 10px;
        margin-right: 10px;
    }
`;

