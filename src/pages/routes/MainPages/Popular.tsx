import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
// HOCS
import { withAjaxLoadMore } from 'components/HOC';
// DUCKS
import {
  effects as moviesEffects,
  selectors as moviesSelectors,
} from 'redux/ducks/movies.duck';
// COMPONENTS
import { Content } from 'components/UI/Page';
import List from 'components/List';
import Spinner from 'components/UI/Spinner';

const { useEffect } = React;

interface Props {
  fetchPopularMovies: (page: number) => Promise<void>;
  movies: IMovies;
  page: number;
  isLoading: boolean;
}

const PopularPages: React.FC<Props> = ({
  movies,
  fetchPopularMovies,
  isLoading,
  page,
  ...rest
}) => {
  useEffect(() => {
    fetchPopularMovies(page);
  }, [fetchPopularMovies, page]);
  return (
    <Content>
      <h2>Popular</h2>
      {movies && <List list={movies.results} {...rest} />}
      {isLoading && (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </Content>
  );
};

export default compose(
  connect(
    state => ({
      movies: moviesSelectors.getPopularMovies(state),
      isLoading: moviesSelectors.getLoading(state),
    }),
    { ...moviesEffects },
  ),
  withAjaxLoadMore,
  React.memo,
)(PopularPages);

const Loading = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;
