import { useEffect, useState } from 'react';
import { usePrevious } from './compare';

export function useSuccess({ loadingState, errorState }: { loadingState: boolean; errorState: string }) {
  const [success, setSuccess] = useState<boolean>(false);
  const previous = usePrevious({ loadingState });
  useEffect(() => {
    if (!previous) return;
    if (previous.loadingState !== loadingState && !loadingState && errorState === '') {
      setSuccess(true);
    }
  }, [previous, setSuccess, loadingState, errorState]);
  return success;
}
