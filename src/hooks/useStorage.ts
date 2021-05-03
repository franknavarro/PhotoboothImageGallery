import { useCallback, useEffect, useState } from 'react';
import { storage } from '../helpers/firebase';
import firebase from 'firebase/app';

export type ImageRef = firebase.storage.Reference;
type ImageRefs = ImageRef[];

const MAX_PHOTOS_PER_PAGE = 50;

const useStorage = (uid: string) => {
  const [files, setFiles] = useState<ImageRefs>([]);
  const [filesPage, setFilesPage] = useState<ImageRefs>([]);
  // When page is 0 then we have loaded all images
  const [page, setPage] = useState<number>(0);

  const getNextPage = useCallback(async () => {
    if (page === 0) return;
    const startIndex = page * MAX_PHOTOS_PER_PAGE;
    const endIndex = startIndex + MAX_PHOTOS_PER_PAGE;
    setFilesPage((prev) => [...prev, ...files.splice(startIndex, endIndex)]);
    setPage(endIndex < files.length ? page + 1 : 0);
  }, [page, files]);

  const getAllImages = useCallback(async () => {
    const newFiles = (await storage.child(`${uid}/thumbnail`).listAll()).items;
    newFiles.sort(
      (a, b) => parseInt(b.name.split('.')[0]) - parseInt(a.name.split('.')[0]),
    );
    setPage(newFiles.length <= MAX_PHOTOS_PER_PAGE ? 0 : 1);
    setFiles(newFiles);
    setFilesPage(newFiles.slice(0, MAX_PHOTOS_PER_PAGE));
  }, [uid]);

  useEffect(() => {
    getAllImages();
  }, [getAllImages]);

  return [filesPage, getNextPage] as const;
};

export default useStorage;
