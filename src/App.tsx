import "./App.css";
import { Redirect, Route, Link, Switch } from "react-router-dom";
import MoviesPage from "./Pages/MoviesPage";
import TvShowsPage from "./Pages/TvShowsPage";
import DetailsPage from "./Pages/DetailsPage";

function App() {
  return (
    <div>
      <main>
        <Switch>
          <Route path="/tvshows">
            <TvShowsPage />
          </Route>
          <Route path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/details/:type/:itemId">
            <DetailsPage />
          </Route>
          <Route path="/" exact>
            <Redirect to="/tvshows"></Redirect>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
