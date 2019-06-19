import { useCallback, useState } from 'react';

export default interface IHook {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useSidebar = (initialState: boolean = false): IHook => {
  const [ isSidebarOpen, setState ] = useState<boolean>(initialState);
  const openSidebar = useCallback(() => setState(true), []);
  const closeSidebar = useCallback(() => setState(false), []);

  return {
    isSidebarOpen,
    openSidebar,
    closeSidebar
  };
};


