import auth from '@react-native-firebase/auth';

export const getIdToken = () => auth().currentUser?.getIdToken();

export const firebaseLogin = (email: string, password: string) => auth().signInWithEmailAndPassword(email, password);

export const firebaseLogout = () => auth().signOut();

export const onAuthStateChanged = (listener: any) => auth().onAuthStateChanged(listener);
