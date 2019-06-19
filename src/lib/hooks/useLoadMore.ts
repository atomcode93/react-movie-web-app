import { useCallback, useState } from 'react';

export default interface IHook {
  currentPage: number;
}

export const useLoadMore = (initialState: number = 1) => {
  const [currentPage, setState] = useState<number>(initialState);
  const handleLoadMore =
  useCallback(() => {
    setState(currentPage + 1);
  }, []);

  return {
      currentPage,
      handleLoadMore,
  };
};

