import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import PL from './components/PL';
import Cashflow from './components/Cashflow';
import AccPayReceive from './components/Acc';
import ProjectPerformance from './components/ProjectPerformance';




function App() {
  return (
    <div className='wrapper'>
        <Router>
            <Sidebar />
            <Switch>
              <div style={{ marginLeft: 200 }}>
                <Route exact path="/"> </Route>
                <Route path="/PL"><PL/></Route>
                <Route path="/Cashflow"><Cashflow/></Route>
                <Route path="/AccPayReceive"><AccPayReceive/></Route>
                <Route path="/ProjectPerformance"><ProjectPerformance/></Route>
              </div>
              
            </Switch>
        </Router>
    </div>
  );
}

export default App;