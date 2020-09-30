import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  height: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: ${(props) => (props.loading ? 'center' : null)};
  align-items: ${(props) => (props.loading ? 'center' : null)};

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const Form = styled.div`
  margin-top: 20px;
  position: relative;

  input {
    padding-left: 30px;

    &:focus {
      box-shadow: 0 0 0 0;
      border-color: transparent;
    }
  }

  div {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;

export const ContainerCountry = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  background: #ececec;
  border-radius: 5px;
  transition: background 0.5s ease;

  &:hover {
    background: #ffffff;
  }

  button {
    display: flex;
    flex: 1;
    align-items: flex-start;
    text-align: left;
    flex-direction: row;
    color: #000;
    background: none;
    border: none;
    padding: 10px;

    &:hover {
      text-decoration: none;
      background: #ececec;
      color: #000;
    }

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    h3 {
      margin: 0;
      font-weight: 700;
      font-size: 15px;
    }

    span {
      font-size: 13px;
    }
  }
`;
