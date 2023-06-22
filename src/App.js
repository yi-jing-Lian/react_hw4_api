import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import PL from './components/PL';
import Cashflow from './components/Cashflow';




function App() {
  return (
    <div className='wrapper'>
        <Router>
            <Sidebar />
            <Switch>
              <Route exact path="/"> </Route>
              <Route path="/PL"><PL/></Route>
              <Route path="/Cashflow"><Cashflow/></Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;