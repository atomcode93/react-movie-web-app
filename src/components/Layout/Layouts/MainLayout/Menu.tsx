import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  userName: string;
  onClick: () => Promise<any>;
}

interface MenuProps {
  readonly isOpen: boolean;
}

const Menu: React.FC<Props> = ({ isOpen, userName, onClick }) => {
  return (
    <Wrapper isOpen={isOpen}>
      <Span>{userName}</Span>
      <Ul>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/watch-later">Watch Later</Link>
        </li>
        <li>
          <Logout href="#" onClick={onClick}>
            Logout
          </Logout>
        </li>
      </Ul>
    </Wrapper>
  );
};

export default Menu;

const activeClassName = 'active';

const Wrapper = styled.div<MenuProps>`
  position: absolute;
  top: 120%;
  right: -94%;
  z-index: 1;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  min-width: 200px;
  width: max-content;
  text-align: right;
  background-color: ${({ theme }) => theme.colors.black};
  transition: right 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
`;

const Span = styled.span`
  position: relative;
  display: block;
  font-size: 13px;
  text-transform: uppercase;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.red};
  padding: 10px;

  ::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 58px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.colors.black};
  }
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Link = styled(NavLink).attrs({ activeClassName })`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  padding: 10px;
  text-align: left;
  transition: all 0.3s ease;

  :hover {
    background-color: ${({ theme }) => theme.colors.red};
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.colors.red};
    svg path {
      fill: ${({ theme }) => theme.colors.red};
    }
  }
`;

const Logout = styled.a`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  padding: 10px;
  text-align: left;
  transition: all 0.3s ease;

  :hover {
    background-color: ${({ theme }) => theme.colors.red};
  }
  border-top: 1px solid ${({ theme }) => theme.colors.red};
  :hover {
    background-color: ${({ theme }) => theme.colors.red};
  }
`;
