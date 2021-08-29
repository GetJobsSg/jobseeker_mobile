import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

interface NotificatioProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const NotificationProvider = (props: NotificatioProviderProps) => {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.info('Successfully retrieved fcmToken', fcmToken);
    } else {
      console.warn('Unable to retrieve fcmToken');
    }
  };

  const requestNotifPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const isEnabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (isEnabled) {
      await getFcmToken();
    }
  };

  useEffect(() => {
    requestNotifPermission();
  }, []);

  const { children } = props;
  return <>{children}</>;
};

export default NotificationProvider;
