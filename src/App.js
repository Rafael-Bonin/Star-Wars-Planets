import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './Provider';
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
