import { useEffect } from "react";

export const useSetGlobalEventHandler = (globalTarget: Window | Document, eventName: string, f: (e: Event) => void, cond: any = null) => useEffect(() => {
  if (globalTarget && eventName && f) {
    globalTarget.addEventListener(eventName, f);
    return () => {
      globalTarget.removeEventListener(eventName, f);
    };
  } 
}, [cond]);
