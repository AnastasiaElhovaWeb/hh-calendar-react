import React from 'react';
import ReactDOM from 'react-dom';
import App from './RegistrationForm.jsx';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/core.css';
import './assets/css/main.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();