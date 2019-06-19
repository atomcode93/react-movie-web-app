import * as React from 'react';
import { History } from 'history';
// HOOKS
import { useSearch } from 'lib/hooks';

interface InjectedProps {
  history: History;
}

// EXPORTED HOC
const withAjaxSearch = <P extends InjectedProps>(
  Component: React.ComponentType<P>,
): React.FC<P & InjectedProps> => props => {
  const { history } = props;
  const { searchKeyword, searchByKeyword } = useSearch(null);

  if (searchKeyword) {
    history.push({
      pathname: `/search`,
      search: `?query=${searchKeyword}`,
    });

    searchByKeyword('');
  }

  return (
    <Component
      {...props as P}
      searchKeyword={searchKeyword}
      searchByKeyword={searchByKeyword}
    />
  );
};

export default withAjaxSearch;
