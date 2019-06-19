import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { Location } from 'history';
import { MdMenu } from 'react-icons/md';
import styled from 'styled-components';
// HOOKS
import { usePrevious } from 'lib/hooks';
// STYLES
import { media, primaryTheme } from 'lib/styles';
// DUCKS
import {
  effects as authEffects,
  selectors as authSelectors,
} from 'redux/ducks/auth.duck';
// HOCS
import { withAjaxSearch } from 'components/HOC';
// COMPONENTS
import SearchBar from 'components/UI/SearchBar';
import Menu from './Menu';

const { useState } = React;

interface Props {
  isAuthenticated?: boolean;
  authLogout: () => Promise<any>;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  user?: any;
  searchByKeyword: () => void;
  location: Location;
}

const { useEffect } = React;

const Header: React.FC<Props> = ({
  isAuthenticated,
  isSidebarOpen,
  authLogout,
  location,
  openSidebar,
  searchByKeyword,
  user,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const prevLocation = usePrevious(location.pathname);

  const toggleUserMenu = () => {
    setUserMenuOpen(prevUserMenuOpen => !prevUserMenuOpen);
  };

  useEffect(() => {
    if (prevLocation && prevLocation !== location.pathname) {
      setUserMenuOpen(false);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <Wrapper>
      {!isSidebarOpen && (
        <Logo>
          <Link to="/">Safr</Link>
        </Logo>
      )}
      <SearchBar searchByKeyword={searchByKeyword} />
      {isAuthenticated ? (
        <UserWrapper>
          {user.photoURL ? (
            // eslint-disable-next-line
            <img
              onClick={toggleUserMenu}
              src={user.photoURL}
              alt={user.displayName}
              width="48"
              height="48"
            />
          ) : (
            <>
              <svg
                onClick={toggleUserMenu}
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="-949 951 100 125"
              >
                <path
                  fill={primaryTheme.colors.white}
                  d="M-899 953.5c-26.2 0-47.5 21.3-47.5 47.5s21.3 47.5 47.5 47.5 47.5-21.3 47.5-47.5-21.3-47.5-47.5-47.5zm28.2 73.2c-1.4-2.5-3.6-4.6-6.5-5.7l-9.9-4.3c-2.6-1-4.4-3.5-4.6-6.3l-.2-1.8c4.6-3.5 7.7-10.3 7.7-17.5 0-10.4-6.6-17.6-14.7-17.6s-14.7 7.2-14.7 17.6c0 7.2 3.1 13.9 7.7 17.5l-.2 1.8c-.2 2.8-2 5.2-4.6 6.3l-9.9 4.3c-2.8 1.1-5.1 3.2-6.5 5.7-6.2-6.8-10-15.8-10-25.7 0-21 17.1-38.1 38.1-38.1S-861 980-861 1001c.1 9.9-3.7 18.9-9.8 25.7z"
                />
              </svg>
            </>
          )}
          {user.displayName ? (
            <Menu
              userName={user.displayName}
              isOpen={userMenuOpen}
              onClick={authLogout}
            />
          ) : (
            <Menu
              userName={user.email}
              isOpen={userMenuOpen}
              onClick={authLogout}
            />
          )}
        </UserWrapper>
      ) : (
        <Login>
          <Link to="/login">Register / Log in</Link>
        </Login>
      )}
      <HamburgerBlock onClick={openSidebar}>
        <MdMenu size="32px" />
      </HamburgerBlock>
    </Wrapper>
  );
};

export default compose(
  connect(
    state => ({
      isAuthenticated: authSelectors.getAuth(state),
      user: authSelectors.getUser(state),
    }),
    { ...authEffects },
  ),
  withRouter,
  withAjaxSearch,
)(Header);

const Wrapper = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 200px 1fr 140px;
  ${media.phone`
  grid-template-columns: 1fr 50px;
  background-color: ${({ theme }) => theme.colors.red};
  `};
  justify-items: center;
  align-items: center
  background-color: ${({ theme }) => theme.colors.darkRed};
  height: 60px;
  > svg {
    width: 50px;
  }
`;

const Logo = styled.h1`
  font-size: 36px;
  ${media.phone`
    display: none;
  `};
  > a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
  }
`;

const Login = styled.div`
  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    :hover {
      opacity: 0.8;
    }
  }
  ${media.phone`
    display: none;
  `};
`;

const UserWrapper = styled.div`
  position: relative;
  cursor: pointer;
  ${media.phone`
  display: none;
`};
`;

const HamburgerBlock = styled.div`
  display: none;
  cursor: pointer;
  ${media.phone`
    display: grid;
  `};
  svg {
    color: ${({ theme }) => theme.colors.white};
  }

  :hover,
  :active {
    opacity: 0.8;
  }
`;
