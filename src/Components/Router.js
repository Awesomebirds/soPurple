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

const myRouter = ({ uid, isManager, cocktails, spirits, tags, proofs }) => {
  return (
    <Router>
      <Header uid={uid} />
      <Switch>
        <Route exact path="/">
          <Home cocktails={cocktails} tags={tags} />
        </Route>
        <Route exact path="/cocktail">
          <Cocktail
            cocktails={cocktails}
            spirits={spirits}
            tags={tags}
            proofs={proofs}
            isManager={isManager}
          />
        </Route>
        <Route exact path="/cocktail/new">
          <NewCocktail
            cocktails={cocktails}
            spirits={spirits}
            tags={tags}
            proofs={proofs}
          />
        </Route>
        <Route path="/cocktail/:name">
          <Detail isManager={isManager} />
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
