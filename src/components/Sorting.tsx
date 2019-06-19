import * as React from 'react';
import Dropdown from 'react-dropdown';
import styled from 'styled-components';
// CONSTANTS
import { SORT_BY, SORT_BY_ORDER } from 'lib/constants/selectOptions';

interface Props {
  filters: IFiltersState;
  updateFilters: (filters: IFiltersState) => void;
}

const Sorting: React.FC<Props> = ({ filters, updateFilters }) => (
  <Wrapper>
    <div>
      <Label>Sort by</Label>
      <Dropdown
        options={SORT_BY}
        value={filters.sort_by.label}
        onChange={(sort_by: ISortOrder) =>
          updateFilters({ ...filters, sort_by })
        }
      />
    </div>
    <div>
      <Label>Order by</Label>
      <Dropdown
        options={SORT_BY_ORDER}
        value={filters.order.label}
        onChange={(order: ISortOrder) => updateFilters({ ...filters, order })}
      />
    </div>
  </Wrapper>
);

export default Sorting;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  .Dropdown-root {
  position: relative;
}

.Dropdown-root + .Dropdown-root {
  margin-top: 3px;
}

.Dropdown-control {
  font-size: 14px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  outline: none;
  padding: 6px 40px 6px 10px;
  transition: all 200ms ease;
}

.Dropdown-control:hover {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

.Dropdown-arrow {
  border-color: ${({ theme }) => theme.colors.red}; transparent transparent;
  border-style: solid;
  border-width: 5px 5px 0;
  content: ' ';
  display: block;
  height: 0;
  margin-top: -ceil(2.5);
  position: absolute;
  right: 10px;
  top: 11px;
  width: 0;
}

.Dropdown-root.is-open .Dropdown-arrow {
  border-color: transparent transparent #999;
  border-width: 0 5px 5px;
}

.Dropdown-menu {
  background-color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
}

.Dropdown-menu .Dropdown-group > .Dropdown-title{
  padding: 8px 10px;
  color: rgba(51, 51, 51, 1);
  font-weight: bold;
  text-transform: capitalize;
}

.Dropdown-option {
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: block;
  padding: 8px 10px;
  font-size: 12px;
}

.Dropdown-option:last-child {
  border-bottom-right-radius: 2px;
   border-bottom-left-radius: 2px;
}

.Dropdown-option:hover {
  color: ${({ theme }) => theme.colors.red};
}

.Dropdown-option.is-selected {
  background-color: #f2f9fc;
  color: #333;
}

.Dropdown-noresults {
  box-sizing: border-box;
  color: #ccc;
  cursor: default;
  display: block;
  padding: 8px 10px;
}

.Dropdown-arrow {
      display: none;
    }

    .Dropdown-placeholder {
      text-decoration: underline;
    }

    .Dropdown-control {
      padding: 6px 20px 6px 10px;
    }

  > div {
    display: flex;
    align-items: center;
    display: inherit;
    padding: 0 8px;
  }
`;

const Label = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
