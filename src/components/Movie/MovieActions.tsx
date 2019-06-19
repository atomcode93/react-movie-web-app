import * as React from 'react';
import { Link } from 'react-router-dom';
import { MdFavorite, MdAccessTime } from 'react-icons/md';
import styled from 'styled-components';
// STYLES
import { media, primaryTheme } from 'lib/styles';

interface Props {
  isAuthenticated: boolean;
  onFavoriteSelect?: () => void;
  onFavoriteDeselect?: () => void;
  onWatchLaterSelect?: () => void;
  onWatchLaterDeselect?: () => void;
  favorited: boolean;
  isWatchLater: boolean;
}

const renderFavHeart = (onFavoriteSelect, onFavoriteDeselect, isAuthenticated, favorited) => {
  if (isAuthenticated) {
    return favorited ? (
      <MdFavorite
        onClick={onFavoriteDeselect as any}
        color={primaryTheme.colors.red}
        size="40px"
      />
    ) :
    (
      <MdFavorite
        onClick={onFavoriteSelect as any}
        color={ primaryTheme.colors.white}
        size="40px"
      />
    );
  }
  return (
    <Link to={{ pathname: '/login', state: window.location.pathname }}>
      <MdFavorite
        onClick={() => {}}
        color={favorited ? primaryTheme.colors.red: primaryTheme.colors.white}
        size="40px"
      />
    </Link>
  );
};

const renderWatchLaterClock = (onWatchLaterSelect, onWatchLaterDeselect, isAuthenticated, isWatchLater) => {
  if (isAuthenticated) {
    return isWatchLater ? (
      <MdAccessTime
      onClick={onWatchLaterDeselect as any}
      color={primaryTheme.colors.red}
      size="40px"
    />
  ) :
  (
    <MdAccessTime
      onClick={onWatchLaterSelect as any}
      color={ primaryTheme.colors.white}
      size="40px"
    />
  );
}
  return (
    <Link to={{ pathname: '/login', state: window.location.pathname }}>
      <MdAccessTime color={primaryTheme.colors.white} size="40px" />
    </Link>
  );
};

const MovieActions: React.FC<Props> = ({
  onFavoriteSelect,
  onFavoriteDeselect,
  onWatchLaterSelect,
  onWatchLaterDeselect,
  isAuthenticated,
  favorited,
  isWatchLater,
}) => {
  return (
    <Wrapper>
      {renderFavHeart(onFavoriteSelect,onFavoriteDeselect, isAuthenticated, favorited)}
      {renderWatchLaterClock(onWatchLaterSelect, onWatchLaterDeselect, isAuthenticated, isWatchLater)}
    </Wrapper>
  );
};

export default MovieActions;

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 200px;
  svg {
    padding: 10px;
    border: 2px solid white;
    border-radius: 50%;
    position: relative;
    transition: all 0.4s ease;
    cursor: pointer;
    :hover {
      fill: ${({ theme }) => theme.colors.red};
      border-color: ${({ theme }) => theme.colors.red};
    }
  }
  ${media.phone`
    justify-self: center;
  `};
`;
