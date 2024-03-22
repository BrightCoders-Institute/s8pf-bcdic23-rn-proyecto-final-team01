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

interface AuthContextType {
  userId: string | null;
  password: string | null;
  setPasswordOnLogin: (newPassword: string) => void;
}

const defaultAuthContext: AuthContextType = {
  userId: null,
  password: null,
  setPasswordOnLogin: () => {},
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const setPasswordOnLogin = (newPassword: string) => {
    console.log('password', newPassword);
    setPassword(newPassword);
  };

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
    <AuthContext.Provider value={{ userId, password, setPasswordOnLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);