import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import styled from 'styled-components';
// DUCKS
import {
  actions as movieActions,
  effects as moviesEffects,
  selectors as moviesSelectors,
} from 'redux/ducks/movies.duck';
import { selectors as authSelectors } from 'redux/ducks/auth.duck';
import { actions as modalsActions } from 'redux/ducks/modals.duck';
// COMPONENTS
import { Content } from 'components/UI/Page';
import MovieInfo from 'components/Movie/MovieInfo';
import Spinner from 'components/UI/Spinner';

type Props = RouteComponentProps & {
  isLoading: boolean;
  match: { params: { id: number } };
  movie: IMovie;
  isAuthenticated: boolean;
  closeModal: () => void;
  openModal: () => void;
  clearMovie: () => void;
  fetchMovie: (id: number) => Promise<void>;
};

const { useEffect } = React;

const Movie: React.FC<Props> = ({
  isAuthenticated,
  closeModal,
  openModal,
  clearMovie,
  fetchMovie,
  isLoading,
  match,
  movie,
}) => {
  useEffect(() => {
    return () => {
      clearMovie();
    };
  }, [clearMovie]);
  useEffect(() => {
    fetchMovie(match.params.id);
  }, [fetchMovie, match.params.id]);
  return (
    <Content>
      {isLoading || !movie ? (
        <Loading>
          <Spinner />
        </Loading>
      ) : (
        <Wrapper>
          <MovieInfo
            movie={movie}
            openModal={openModal}
            closeModal={closeModal}
            isAuthenticated={isAuthenticated}
          />
        </Wrapper>
      )}
    </Content>
  );
};

export default compose(
  connect(
    state => ({
      isAuthenticated: authSelectors.getAuth(state),
      movie: moviesSelectors.getMovie(state),
      isLoading: moviesSelectors.getLoading(state),
    }),
    { ...modalsActions, ...movieActions, ...moviesEffects },
  ),
  React.memo,
)(Movie);

const Wrapper = styled.div`
  display: grid;
`;

const Loading = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
