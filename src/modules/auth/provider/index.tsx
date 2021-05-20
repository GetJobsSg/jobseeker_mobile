import React, { useEffect } from 'react';
import { node } from 'prop-types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getIdToken, onAuthStateChanged } from '../../../utils/firebase';

const AuthProvider: React.FC = (props) => {
  const { children } = props;

  const handleOnAuthStateChanged = (user: FirebaseAuthTypes.UserCredential) => {
    if (user) {
      // user is authenticated; set storage token
      console.log(getIdToken()?.then((t) => console.log(t)));
    } else {
      // clear storage token
      console.log('user not login');
    }
  };

  // create observer to observe if user is login
  useEffect(() => {
    const sub = onAuthStateChanged(handleOnAuthStateChanged);
    return sub;
  }, []);

  return <>{children}</>;
};

AuthProvider.propTypes = {
  children: node.isRequired,
};
export default AuthProvider;
