import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import auth from '@react-native-firebase/auth';
import { useMst } from '../../../store';

const AuthProvider: React.FC = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [authUser, setUser] = useState(null);
  const { children } = props;

  const authChanged = (user: any) => {
    if (user) {
      // user is logged in
      setUser(user);
    } else {
      // user not login
      setUser(null);
    }

    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authChanged);
    return subscriber;
  }, []);

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
