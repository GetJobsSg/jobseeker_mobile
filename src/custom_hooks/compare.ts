import { useEffect, useRef } from 'react';

export function usePrevious<T>(val: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
}
