import * as React from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// STYLES
import { media, primaryTheme } from 'lib/styles';
// ASSETS
import NoImage from 'assets/no_image.jpg';
// HOOKS
import { useShowMore } from 'lib/hooks';
// COMPONENTS
import Meter from 'components/UI/Meter';
import VoteBadge from 'components/UI/VoteBadge';
import MovieInfoBar from 'components/Movie/MovieInfoBar';
import ShowMore from 'components/UI/ShowMore';

interface Props {
  movie: IMovie;
  isAuthenticated: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const renderPlay = (isAuthenticated, openModal, closeModal, trailer) => {
  if (isAuthenticated) {
    return (
      // eslint-disable-next-line
       <LinkInstead onClick={() => openModal({
            type: 'video',
            args: { closeModal, trailerLink: trailer.key },
          })
        }
      >
        <span>Watch Trailer</span>
        <MdPlayArrow color={primaryTheme.colors.white} size="40px" />
      </LinkInstead>
    );
  }
  return (
    <StyledLink to={{ pathname: '/login', state: window.location.pathname }}>
      <span>Watch Trailer</span>
      <MdPlayArrow color={primaryTheme.colors.white} size="40px" />
    </StyledLink>
  );
};

const MovieInfo: React.FC<Props> = ({
  isAuthenticated,
  movie,
  openModal,
  closeModal,
}) => {
  const { isOpen, toggleShowMore } = useShowMore(false);
  return (
    <Wrapper>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt=""
        />
      ) : (
        <img src={NoImage} alt="" />
      )}
      <Content>
        <h1>{movie.title}</h1>
        {movie.videos &&
          movie.videos.results.length > 0 &&
          movie.videos.results[0] &&
          renderPlay(
            isAuthenticated,
            openModal,
            closeModal,
            movie.videos.results[0],
          )}
        <h2>Overview</h2>
        <p>{movie.overview}</p>

        <Rating>
          <h2>IMDB RATING</h2>
          <VoteBadge voteAverage={movie.vote_average} right="0px" top="0px" />
          <Meter
            min="0"
            max="100"
            optimum="100"
            low="40"
            high="70"
            value={movie.vote_average * 10}
          />
        </Rating>
        <ShowMore
          isOpen={isOpen}
          toggleShowMore={toggleShowMore}
          title="Show additional info"
        />
        {isOpen && (
          <MovieInfoBar
            time={movie.runtime || 0}
            budget={movie.budget || 0}
            revenue={movie.revenue || 0}
          />
        )}
      </Content>
    </Wrapper>
  );
};

export default MovieInfo;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-gap: 20px;
  ${media.phone`
  grid-template-columns: 1fr;

    img {
      justify-self: center;
    }
  `};

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

const Content = styled.div`
  display: grid;
  ${media.phone`
    grid-gap: 20px;
    > div:first-child {
      justify-self: center;
    }
    h1 {
        text-align: center;
    };
  `};
`;

const Rating = styled.div`
  position: relative;
`;

const StyledLink = styled(Link)`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  width: 140px;
  height: max-content;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.colors.red};

    svg {
      fill: ${({ theme }) => theme.colors.red};
    }
  }
`;

const LinkInstead = styled.div`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  width: 140px;
  height: max-content;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.colors.red};

    svg {
      fill: ${({ theme }) => theme.colors.red};
    }
  }
`;
