
import './App.css';
import Login from './Pages/Login';
import Todos from './Pages/Todos';
import {  Route, Switch } from "react-router-dom";
import Home from './Pages/Home';
import ResponsiveAppBar from './components/AppBar';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
     <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/todos" exact>
            <Todos />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
         <Route path="/home" exact>
            <Home />
          </Route> 
          <Route path="/*">
            <Home />
          </Route> 
        </Switch>
    </div>
  );
}

export default App;
