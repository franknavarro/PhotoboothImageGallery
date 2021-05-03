import {
  useCallback,
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';
import firebase from 'firebase/app';
import { auth } from '../helpers/firebase';

type Context = {
  user: firebase.User | null;
  signIn: (email: string, password: string) => Promise<void> | void;
};

const AuthContext = createContext<Context>({
  user: null,
  signIn: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Context['user']>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

  const signIn: Context['signIn'] = useCallback(async (email, password) => {
    const newUser = await auth.signInWithEmailAndPassword(
      email + '@frankandmissy.com',
      password,
    );
    setUser(newUser.user);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      setIsAuthenticating(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
