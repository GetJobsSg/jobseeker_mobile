import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import { useMst } from '../../../store';

const AuthProvider: React.FC = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [authUser, setUser] = useState(null);
  const { children } = props;

  // create observer to observer user authentication
  const idTokenChanged = (user: any) => {
    if (user) {
      // eslint-disable-next-line no-console
      console.log('token changed...');

      // user is logged in
      setUser(user);
    } else {
      // user not login
      setUser(null);
    }

    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onIdTokenChanged(idTokenChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!initializing) {
      SplashScreen.hide();
    }
  }, [initializing]);

  const { authStore } = useMst();
  const { setAuth } = authStore;

  useEffect(() => {
    setAuth(authUser);
  }, [setAuth, authUser]);

  return initializing ? null : <>{children}</>;
};

AuthProvider.propTypes = {
  children: node.isRequired,
};
export default AuthProvider;
