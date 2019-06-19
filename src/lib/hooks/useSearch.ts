import { useCallback, useState } from 'react';

interface IHook {
  searchKeyword: string | null;
  searchByKeyword: (e: any) => void;
}

export const useSearch = (initialState = null): IHook => {
  const [ searchKeyword, setState ] = useState<string|null>(initialState);
  const searchByKeyword = useCallback(e => {
    if(typeof e !== 'string') {
      setState(e.target.value);
      return;
    }
    setState(e);
  }, []);

  return {
    searchKeyword,
    searchByKeyword,
  };
};


