import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

const persons = [
  {
    name: "Arto Hellas",
    number: "123456789"
  }
]

ReactDOM.render(
  <App persons={persons}/>,
  document.getElementById('root')
);
