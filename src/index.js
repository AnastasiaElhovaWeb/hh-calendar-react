import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/core.css';
import './assets/css/main.css';
import RegisterForm from "./components/RegisterForm";
//import LoginForm from "./components/LoginForm";


ReactDOM.render(<RegisterForm />, document.getElementById('root'));
registerServiceWorker();