import auth from '@react-native-firebase/auth';

export const firebaseLogin = (email: string, password: string) => auth().signInWithEmailAndPassword(email, password);

export const firebaseLogout = () => auth().signOut();
