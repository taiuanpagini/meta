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

  h5 {
    margin: 20px 0 5px;
  }
`;

export const ContainerDetails = styled.div`
  display: flex;

  flex-direction: row;
  background: #ececec;
  border-radius: 5px;
  margin-top: 20px;

  img {
    width: 400px;
    margin: 10px;
    border-radius: 5px;
  }
`;

export const DataCountry = styled.div`
  flex: 1;
  flex-direction: column;

  h3 {
    margin: 0;
    font-weight: 700;
    font-size: 20px;
    margin: 10px 0 10px;
  }

  h4 {
    margin: 0 0 5px;
    font-size: 16px;
  }
`;
