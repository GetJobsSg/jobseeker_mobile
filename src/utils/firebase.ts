import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

export const getIdToken = () => auth().currentUser?.getIdToken();

export const getNotificationPermission = () =>
  messaging()
    .requestPermission()
    .then((authStatus) => {
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        return true;
      }
      return false;
    });

export const firebaseLogin = (email: string, password: string) =>
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => res.user);

export const firebaseLogout = () => auth().signOut();
