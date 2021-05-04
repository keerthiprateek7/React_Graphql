import './App.css';
import Home from './components/Home'
import CustomerData from './components/CustomerData'
import ActiveData from './components/ActiveData'
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/customers" component={CustomerData} />
          <Route exact path="/activecustomers" component={ActiveData} />
      </Switch>
      </div>
    </Router>
      
    
  );
}

export default App;
