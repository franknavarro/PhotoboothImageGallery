import { useMemo, useCallback, useEffect, useState } from 'react';
import { firestore, ImageDocs } from '../helpers/firebase';

const MAX_PHOTOS_PER_PAGE = 25;

const useImageLibrary = (uid: string) => {
  const [images, setImages] = useState<ImageDocs>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(true);

  const query = useMemo(
    () =>
      firestore
        .pictures(uid)
        .orderBy('createdAt', 'desc')
        .limit(MAX_PHOTOS_PER_PAGE),
    [uid],
  );

  const getMoreImages = useCallback(
    async (getBefore = false) => {
      setLoadingImages(true);
      const nextImages = await query
        .startAfter(images[images.length - 1])
        .get();
      if (!nextImages.empty) {
        setImages([...images, ...nextImages.docs]);
      } else if (getBefore) {
        const previousImages = await query.endBefore(images[0]).get();
        if (!previousImages.empty) {
          setImages([...previousImages.docs, ...images]);
        }
      }
      setLoadingImages(false);
    },
    [query, images],
  );

  useEffect(() => {
    const getFirstPage = async () => {
      setLoadingImages(true);
      const firstImages = await query.get();
      setImages([...firstImages.docs]);
      setLoadingImages(false);
    };
    getFirstPage();
  }, [query]);

  return { images, loadingImages, getMoreImages };
};

export default useImageLibrary;
