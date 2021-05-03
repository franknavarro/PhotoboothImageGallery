import { useEffect, useState } from 'react';
import { ImageRef } from '../hooks/useStorage';

const useImageLoad = (imgRef: ImageRef | undefined) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [src, setSrc] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const startLoading = async () => {
      try {
        setLoading(true);
        setError(false);
        if (!imgRef) throw new Error('No image found');
        const newSource = await imgRef.getDownloadURL();
        setSrc(newSource);
        const image = new Image();
        image.src = newSource;
        image.onload = () => {
          setLoading(false);
        };
        image.onerror = () => {
          setError(true);
          setLoading(false);
        };
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    startLoading();
  }, [imgRef]);

  return { src, loading, error };
};

export default useImageLoad;
