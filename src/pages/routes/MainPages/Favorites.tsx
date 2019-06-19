import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// DUCKS
import {
  effects as favoritesEffects,
  selectors as favoritesSelectors,
} from 'redux/ducks/favorites.duck';
// COMPONENTS
import { Content } from 'components/UI/Page';
import List from 'components/List';

interface Props {
  getAllFavoritedMoviesFromList: () => Promise<void>;
  favoritedMovies: IMovie[];
}

const { useEffect } = React;

const Favorites: React.FC<Props> = ({
  getAllFavoritedMoviesFromList,
  favoritedMovies,
}) => {
  useEffect(() => {
    getAllFavoritedMoviesFromList();
  }, [getAllFavoritedMoviesFromList]);
  return (
    <Content>
      <h2>Favorites</h2>
      {favoritedMovies && <List list={favoritedMovies} />}
      {!favoritedMovies && <h3>Select your favorite movie</h3>}
    </Content>
  );
};

export default compose(
  connect(
    state => ({
      favoritedMovies: favoritesSelectors.getFavoritedMovies(state),
    }),
    { ...favoritesEffects },
  ),
  React.memo,
)(Favorites);
