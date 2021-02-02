import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import Cocktail from "Routes/Cocktail";
import Whisky from "Routes/Whisky";
import Manage from "Routes/Manage";

const myRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cocktail">
          <Cocktail />
        </Route>
        <Route exact path="/whisky">
          <Whisky />
        </Route>
        <Route exact path="/manage">
          <Manage />
        </Route>
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
};

export default myRouter;
