import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/core.scss';
import './assets/css/main.scss';
import RegisterForm from "./components/CreateMeetingForm";

ReactDOM.render(<RegisterForm />, document.getElementById('root'));
registerServiceWorker();