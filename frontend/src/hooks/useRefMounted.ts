import { useRef, useEffect, MutableRefObject } from 'react';

export const useRefMounted = (): MutableRefObject<boolean> => {
  const isRef = useRef(true);

  useEffect(
    () => (): void => {
      isRef.current = false;
    },
    []
  );

  return isRef;
};
