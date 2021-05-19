import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Add your Firebase credentials
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  appID: process.env.REACT_APP_FB_APP_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
});

export const auth = firebase.auth();
export const storage = firebase.storage().ref();

const dataPoint = <T>(collectionPath: string) =>
  firebase
    .firestore()
    .collection(collectionPath)
    .withConverter<T>({
      toFirestore: (data: T) => data,
      fromFirestore: (snap) => snap.data() as T,
    });

export const firestore = {
  events: dataPoint<{ name: string }>('events'),
};
