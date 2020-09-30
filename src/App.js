import './config/ReactotronConfig';

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes';

import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
