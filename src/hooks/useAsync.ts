import { useCallback, useEffect, useState } from 'react';

const useAsync = <T,>(
  asyncFunction: (...args: any[]) => Promise<T> | T,
  immediate = true,
) => {
  const [loading, setLoading] = useState<boolean>(immediate);
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setValue(null);
      setError(null);
      const result = await asyncFunction();
      setValue(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { execute, loading, value, error };
};

export default useAsync;
