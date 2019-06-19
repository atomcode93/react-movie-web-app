import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// DUCKS
import {
  effects as watchLaterEffects,
  selectors as watchLaterSelectors,
} from 'redux/ducks/watchLater.duck';
// COMPONENTS
import { Content } from 'components/UI/Page';
import List from 'components/List';

interface Props {
  getAllWatchLaterMoviesFromList: () => Promise<void>;
  watchLaterMovies: IMovie[];
}

const { useEffect } = React;

const WatchLater: React.FC<Props> = ({
  getAllWatchLaterMoviesFromList,
  watchLaterMovies,
}) => {
  useEffect(() => {
    getAllWatchLaterMoviesFromList();
  }, [getAllWatchLaterMoviesFromList]);
  return (
    <Content>
      <h2>Watch Later</h2>
      {watchLaterMovies && <List list={watchLaterMovies} />}
      {!watchLaterMovies && <h3>Select your watch later movie</h3>}
    </Content>
  );
};

export default compose(
  connect(
    state => ({
      watchLaterMovies: watchLaterSelectors.getWatchLaterMovies(state),
    }),
    { ...watchLaterEffects },
  ),
  React.memo,
)(WatchLater);
