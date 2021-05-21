import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import auth from '@react-native-firebase/auth';

const AuthProvider: React.FC = (props) => {
  const [initializing, setInitializing] = useState(true);
  const { children } = props;

  const onAuthStateChanged = (user: any) => {
    console.log(user);
    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return initializing ? null : <>{children}</>;
};

AuthProvider.propTypes = {
  children: node.isRequired,
};
export default AuthProvider;
