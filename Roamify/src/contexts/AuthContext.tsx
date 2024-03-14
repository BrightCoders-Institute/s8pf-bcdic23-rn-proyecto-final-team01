import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import auth from '@react-native-firebase/auth';

interface AuthProviderProps {
  children: ReactElement;
}

const AuthContext = createContext({
  userId: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<null | string>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);