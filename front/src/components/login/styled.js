import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0 auto;
`;
export const Box = styled.div`
  width: 30rem;
  max-width: 30rem;
  /* border: 1px solid black; */
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  header {
    background-color: #201c2c;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: #fff;
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    font-size: 30px;
    .header__icon {
      margin-right: 30px;
    }
  }
`;
export const Form = styled.form`
  background-color: #fff;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  color: #777;
  display: grid;
  gap: 0.875em;
  padding: 1.5rem 2rem;
  border: 3px solid black;
  input {
    border-radius: 0.2rem;
    background-color: #eee;
    color: #777;
    padding: 0.25em 0.625em;
    width: 100%;
    &:last-child {
      display: block;
      background-color: #33cc77;
      margin: 0 auto;
      width: 10rem;
      border: none;
      height: 3rem;
      color: #fff;
      font-size: 1.6rem;
      border-radius: 1rem;
    }
  }
`;
