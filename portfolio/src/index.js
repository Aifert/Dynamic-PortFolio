import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App.jsx";
import Time from "./components/Time.jsx";


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

ReactDOM.render(<h1>Hello World</h1>, document.getElementById("root"));

ReactDOM.render(<Time />, document.getElementById("time"));