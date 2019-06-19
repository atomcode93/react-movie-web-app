import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// HELPERS
import { replaceSpacesToHyphensFromString } from 'lib/helpers';
// ASSETS
import NoImage from 'assets/no_image.jpg';
// COMPONENTS
import MovieActions from 'components/Movie/MovieActions';
import VoteBadge from 'components/UI/VoteBadge';

interface Props {
  id: number;
  poster_path: string;
  title: any;
  vote_average: number;
  favoritedIds: string[];
  watchLaterIds: string[];
  favorited: boolean;
  watchLater: boolean;
  isAuthenticated: boolean;
  onFavoriteSelect: any;
  onFavoriteDeselect: any;
  onWatchLaterSelect: any;
  onWatchLaterDeselect: any;
}

const ListItem: React.FC<Props> = props => {
  const {
    id,
    poster_path,
    title,
    vote_average,
    favoritedIds,
    watchLaterIds,
    onFavoriteSelect,
    onFavoriteDeselect,
    onWatchLaterSelect,
    onWatchLaterDeselect,
    isAuthenticated,
    favorited,
    watchLater,
  } = props;

  const isFavorited =
    isAuthenticated && favoritedIds && favoritedIds.includes(String(id));
  const isWatchLater =
    isAuthenticated && watchLaterIds && watchLaterIds.includes(String(id));
  return (
    <Wrapper>
      <VoteBadge voteAverage={vote_average} right="-20px" top="15px" />
      <ImageBox>
        {poster_path ? (
          <>
            <MovieActions
              onFavoriteSelect={() => {
                onFavoriteSelect(id);
              }}
              onFavoriteDeselect={() => {
                onFavoriteDeselect(id);
              }}
              onWatchLaterSelect={() => {
                onWatchLaterSelect(id);
              }}
              onWatchLaterDeselect={() => {
                onWatchLaterDeselect(id);
              }}
              isAuthenticated={isAuthenticated}
              favorited={isFavorited || favorited}
              isWatchLater={isWatchLater || watchLater}
            />
            <ImageLink
              to={`/movie/${id}-${replaceSpacesToHyphensFromString(title)}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster_path}`}
                alt={title}
              />
            </ImageLink>
          </>
        ) : (
          <>
            <MovieActions
              onFavoriteSelect={() => {
                onFavoriteSelect(id);
              }}
              onFavoriteDeselect={() => {
                onFavoriteDeselect(id);
              }}
              onWatchLaterSelect={() => {
                onWatchLaterSelect(id);
              }}
              onWatchLaterDeselect={() => {
                onWatchLaterDeselect(id);
              }}
              isAuthenticated={isAuthenticated}
              favorited={isFavorited || favorited}
              isWatchLater={isWatchLater || watchLater}
            />
            <ImageLink
              to={`/movie/${id}-${replaceSpacesToHyphensFromString(title)}`}
            >
              <img src={NoImage} alt={title} />
            </ImageLink>
          </>
        )}
      </ImageBox>
      <h3>{title}</h3>
    </Wrapper>
  );
};

export default ListItem;

const Wrapper = styled.li`
  position: relative;
  width: 185px;
  transition: opacity 0.3s ease;

  h3 {
    display: block;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white};
`;

const ImageBox = styled.figure`
  position: relative;
  height: 278px;
  margin: 0 auto 15px;
  box-shadow: 3px 4px 7px 2px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transform: translateY(0) scale(1);
  opacity: 1;
  transition: transform 0.5s ease 0s, opacity 0.5s ease 0s;

  > div {
    position: absolute;
    bottom: -40px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transition: bottom 0.4s ease;
    z-index: 1;

    svg {
      border: none;
    }
  }

  img {
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: transform 0.5s cubic-bezier(0.15, 1, 0.33, 1);
}

  }

  :hover img {
    opacity: 0.5;
    transform: scale(1.15);
  }

  :hover > div {
    bottom: 0;
  }
`;

const ImageLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: block;
`;
