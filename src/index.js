import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Game from './Game'
import reportWebVitals from './reportWebVitals';
// let dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];


ReactDOM.render(
  
  <React.StrictMode>
    <div>
    <Game />
  </div>
   

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
