import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import Cocktail from "Routes/Cocktail";
import NewCocktail from "Routes/Cocktail/NewCocktail";
import Whisky from "Routes/Whisky";
import Manage from "Routes/Manage";
import Detail from "Routes/Detail";

const myRouter = ({ uid }) => {
  return (
    <Router>
      <Header uid={uid} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cocktail">
          <Cocktail />
        </Route>
        <Route exact path="/cocktail/new">
          <NewCocktail />
        </Route>
        <Route path="/cocktail/:name">
          <Detail uid={uid} />
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
