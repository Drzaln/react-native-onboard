import React from 'react';
import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();

type AuthData = {
  username: string | null;
  email: string | null;
  password: string | null;
  isLogin: string | null;
};

export const AuthContext = React.createContext<{
  authData: AuthData;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData>>;
}>({
  authData: {
    username: null,
    email: null,
    password: null,
    isLogin: null,
  },
  setAuthData: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [authData, setAuthData] = React.useState<AuthData>({
    username: null,
    email: null,
    password: null,
    isLogin: null,
  });

  React.useEffect(() => {
    const fetchData = () => {
      try {
        const username = storage.getString('username');
        const email = storage.getString('email');
        const password = storage.getString('password');
        const isLogin = storage.getString('isLogin');

        setAuthData({
          username: username ? username : null,
          email: email ? email : null,
          password: password ? password : null,
          isLogin: isLogin ? isLogin : null,
        });
      } catch (error) {
        console.error('Error fetching auth data from MMKV:', error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    storage.set('username', authData.username || '');
    storage.set('email', authData.email || '');
    storage.set('password', authData.password || '');
    storage.set('isLogin', authData.isLogin || '');
  }, [authData]);

  return (
    <AuthContext.Provider value={{authData, setAuthData}}>
      {children}
    </AuthContext.Provider>
  );
};
