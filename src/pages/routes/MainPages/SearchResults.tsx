import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Location } from 'history';
import styled from 'styled-components';
// STYLES
import { media } from 'lib/styles';
// HELPERS
import { getQueryStrings } from 'lib/helpers';
// DUCKS
import {
  effects as moviesEffects,
  selectors as moviesSelectors,
} from 'redux/ducks/movies.duck';
// COMPONENTS
import List from 'components/List';
import Spinner from 'components/UI/Spinner';

interface Props {
  movie: any;
  location: Location;
  isLoading: boolean;
  fetchMovieByQuery: (movieName: string, page?: number) => Promise<void>;
}

const { useEffect } = React;
let term: string | null = '';

const SearchResults: React.FC<Props> = ({
  fetchMovieByQuery,
  location,
  movie,
  isLoading,
}) => {
  useEffect(() => {
    term = getQueryStrings(location.search);
    fetchMovieByQuery(term || '');
  }, [fetchMovieByQuery, location.search]);
  return (
    <Content>
      <h2>Search results</h2>
      {isLoading || (!movie && <Spinner />)}
      {movie && movie.results && (
        <>
          <p>
            There are <b>{movie.total_results}</b> results for: <b>{term}</b>
          </p>
          <List list={movie.results} />
          <button
            type="button"
            disabled={movie.total_pages === 1}
            onClick={() => fetchMovieByQuery(term || '', movie.page + 1)}
          >
            Load more
          </button>
        </>
      )}
    </Content>
  );
};

export default compose(
  connect(
    state => ({
      movie: moviesSelectors.getMovie(state),
      isLoading: moviesSelectors.getLoading(state),
    }),
    { ...moviesEffects },
  ),
  React.memo,
)(SearchResults);

const Content = styled.div`
  position: relative;
  display: grid;
  padding: 30px 25px 40px 30px;

  > p {
    margin-bottom: 30px;
  }

  button {
    width: 200px;
    margin-top: 50px;
    font-size: 22px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.3s;

    ${media.phone`
      justify-self: center;
    `};

    :hover {
      opacity: 0.8;
    }

    :disabled {
      opacity: 0.8;
      pointer-events: none;
      cursor: not-allowed;
    }
  }
`;
