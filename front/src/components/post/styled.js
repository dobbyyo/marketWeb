import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3rem;
  width: 70%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Header = styled.div`
  width: 90%;
  height: 10%;
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 2rem;
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
  h1 {
    font-size: 2rem;
    color: #fff;
  }
`;

export const Main = styled.div`
  width: 90%;
  height: 75%;
  background-color: #40413b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  input {
    margin-bottom: 2rem;
    width: 70%;
    height: 3rem;
  }
  #description {
    height: 5rem;
  }
  .button {
    width: 30%;
    background-color: #201c2c;
    color: #fff;
    border: none;
    font-size: 2rem;
    font-weight: bold;
  }
`;
