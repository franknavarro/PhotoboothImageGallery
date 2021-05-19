import { useEffect, useState } from 'react';

const useImageLoad = (src: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const startLoading = async () => {
      try {
        setLoading(true);
        setError(false);
        if (src === '') throw new Error('No image found');
        const imgRef = new Image();
        imgRef.src = src;
        imgRef.onload = () => {
          setLoading(false);
        };
        imgRef.onerror = () => {
          setError(true);
          setLoading(false);
        };
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    startLoading();
  }, [src]);

  return { src, loading, error };
};

export default useImageLoad;
