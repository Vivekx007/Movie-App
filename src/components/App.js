import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, showFavourite } from "../actions";
import { StoreContext } from "../index";

class App extends React.Component {
  componentDidMount() {
    // make APIs call from here
    const { store } = this.props;

    store.subscribe(() => {
      console.log("Updating");
      this.forceUpdate();
    });
    store.dispatch(addMovies(data));

    console.log("getStore", this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      // found the movie
      return true;
    }
    return false;
  };
  onChangeTab = (val) => {
    const { store } = this.props;
    store.dispatch(showFavourite(val));
  };

  render() {
    const { movies, search } = this.props.store.getState(); //{movies:{}, search:{}}
    const { list, favourites = [], showFavourite = [] } = movies;
    console.log("RENDER", this.props.store.getState());
    const displayMovie = showFavourite ? favourites : list;

    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search}></Navbar>
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourite ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourite ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovie.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}

            {displayMovie.length === 0 ? (
              <div className="no-movies">No movies to display!</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store}></App>}
//       </StoreContext.Consumer>
//     );
//   }
// }

export default App;
