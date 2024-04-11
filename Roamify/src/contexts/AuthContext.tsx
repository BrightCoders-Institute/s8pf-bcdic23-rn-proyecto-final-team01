import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { getUserDataAuten} from '../components';
interface AuthProviderProps {
  children: ReactElement;
}

interface AuthContextType {
  userId: string | null;
  userData: FirebaseAuthTypes.User | null;
  getDataUser: () => Promise<FirebaseAuthTypes.User | undefined>
}

const defaultAuthContext: AuthContextType = {
  userId: null,
  userData: null,
  getDataUser: async () => undefined, 
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [userId, setUserId] = useState<null | string>(null);
  const [userData, setUserData] = useState<null | FirebaseAuthTypes.User>(null);
  
  const getDataUser = async () => {
    if (userId) {
      const _userData = getUserDataAuten();
      setUserData(_userData);
      return _userData
    }
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

  useEffect(() => {
    getDataUser();
  }, [userId]);

  return (
    <AuthContext.Provider value={{userId, userData, getDataUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
