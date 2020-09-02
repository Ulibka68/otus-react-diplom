import React from "react";
import About from "./About";
import {ExpenceList} from "./ExpenceList"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

// параметры определения пути
// https://github.com/pillarjs/path-to-regexp#parameters

class App extends React.Component<any, any> {
  constructor(props?: any) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/list">Список</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/list">
              <ExpenceList />
          </Route>
        </Switch>
      </Router>
    );
  }
}

// export default withRouter(App);
export default App;
