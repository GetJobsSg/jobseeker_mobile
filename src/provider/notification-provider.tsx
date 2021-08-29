import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useMst } from '../store';

interface NotificatioProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const NotificationProvider = (props: NotificatioProviderProps) => {
  const {
    authStore: { isAuthenticated },
  } = useMst();

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) return fcmToken;
    console.warn('unable to retrieve fcmToken');
    return null;
  };

  const requestNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const isEnabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (isEnabled) {
      const fcmToken = await getFcmToken();
      if (fcmToken && isAuthenticated) {
        // call apis to save this fcmToken to db
      }
    } else {
      console.info('Notification permission is not granted');
    }
  };

  // when app launched, check notification permission
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // listen to the changes of fcmToken
  useEffect(() => {
    const fcmSubscriber = messaging().onTokenRefresh((token) => {
      console.info('fcmToken refreshed', token);
    });
    return fcmSubscriber;
  });

  const { children } = props;
  return <>{children}</>;
};

export default NotificationProvider;
