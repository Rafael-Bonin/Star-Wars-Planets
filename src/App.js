import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './Provider';
import 'bulma/css/bulma.min.css';
import Header from './components/Header';

function App() {
  return (
    <Provider>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;
