
import React from 'react';
import { Switch, Route, BrowserRouter} from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";


class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;