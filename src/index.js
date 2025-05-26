import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Attendance from './Attendance';
import ViewList from './ViewList';
import SecurityLock from './SecurityLock';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VAP from './VAP';
import VAPstudentUse from './VAPstudentUse';


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route exact path="/" component={SecurityLock} />
            <Route path="/AMSconfidentialUse" component={Attendance} />
            <Route path="/ViewTodaysReport" component={ViewList} />
            <Route path="/VAP" component={VAP} />
            <Route path="/VAPstudentUse" component={VAPstudentUse} />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
