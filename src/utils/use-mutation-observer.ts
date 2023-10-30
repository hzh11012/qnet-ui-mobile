import { useState, useEffect } from 'react';

const config = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};

type useMutationObserverRefTarget = HTMLElement | null;

export const useMutationObserverRef = (
  callback: MutationCallback,
  options: MutationObserverInit = config
): [
  useMutationObserverRefTarget,
  (node: useMutationObserverRefTarget) => void
] => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (target) {
      const observer = new MutationObserver(callback);
      observer.observe(target, options);

      return () => {
        observer.disconnect();
      };
    }
  }, [target, callback, options]);

  return [target, setTarget];
};
