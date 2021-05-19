import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { firestore, ImageDoc, ImageDocs } from '../helpers/firebase';

const MAX_PHOTOS_PER_PAGE = 25;

const useImageLibrary = (uid: string) => {
  const [images, setImages] = useState<ImageDocs>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  const [position, setPosition] = useState<number>(0);
  const [startNextPage, setStartNextPage] = useState<ImageDoc | null>(null);
  const [beginingOfPage, setBeginingOfPage] = useState<ImageDoc | null>(null);
  const [shouldFindNew, setShouldFindNew] = useState<boolean>(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const query = useMemo(
    () =>
      firestore
        .pictures(uid)
        .orderBy('createdAt', 'desc')
        .limit(MAX_PHOTOS_PER_PAGE),
    [uid],
  );

  const getNextPage = useCallback(async () => {
    if (loadingImages || !startNextPage) return;
    setLoadingImages(true);
    const nextImages = await query.startAfter(startNextPage).get();
    if (!nextImages.empty) {
      setImages((prev) => [...prev, ...nextImages.docs]);
      setStartNextPage(nextImages.docs[nextImages.size - 1]);
    } else {
      setStartNextPage(null);
    }
    setLoadingImages(false);
  }, [query, startNextPage, loadingImages]);

  const getNewImages = useCallback(async () => {
    if (loadingImages || !shouldFindNew || !beginingOfPage) return;
    setLoadingImages(true);
    const newImages = await query.endBefore(beginingOfPage).get();
    if (!newImages.empty) {
      setImages((prev) => [...prev, ...newImages.docs]);
      setBeginingOfPage(newImages.docs[0]);
      setShouldFindNew(true);
    } else {
      setShouldFindNew(false);
    }
    setLoadingImages(false);
  }, [shouldFindNew, query, loadingImages, beginingOfPage]);

  // Load initial images
  useEffect(() => {
    const getFirstPage = async () => {
      setLoadingImages(true);
      const firstImages = await query.get();
      setImages([...firstImages.docs]);
      setStartNextPage(firstImages.docs[firstImages.size - 1]);
      setBeginingOfPage(firstImages.docs[0]);
      setLoadingImages(false);
    };
    getFirstPage();
  }, [query]);

  // Load with infinite scroll
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        getNextPage();
      }
    },
    [getNextPage],
  );
  useEffect(() => {
    if (loadMoreRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      });
      observer.observe(loadMoreRef.current);
      return () => observer.disconnect();
    }
  }, [handleObserver]);

  // Load when reached end of slides
  useEffect(() => {
    if (position === images.length - 1 && !loadingImages) {
      if (startNextPage) getNextPage();
      else getNewImages();
    } else if (!shouldFindNew && !loadingImages) {
      setShouldFindNew(true);
    }
  }, [
    position,
    images,
    loadingImages,
    getNextPage,
    getNewImages,
    shouldFindNew,
    startNextPage,
  ]);

  return { images, loadingImages, loadMoreRef, position, setPosition };
};

export default useImageLibrary;
