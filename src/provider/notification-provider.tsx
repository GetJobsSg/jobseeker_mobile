import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { observer } from 'mobx-react-lite';
import { useMst } from '../store';

interface NotificatioProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const NotificationProvider = (props: NotificatioProviderProps) => {
  const {
    authStore: { isAuthenticated, setFcmToken, userFcmToken, updateUserFcmToken },
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
      if (fcmToken) {
        console.log('requestNotificationPermission setFcmToken');
        setFcmToken(fcmToken);
      }
    } else {
      console.warn('Notification permission is not granted');
    }
  };

  // this will trigger everytime the app launch from quit state
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // update user fcmToken when
  // 1. app open from quit state: isAuthenticated: false => true, userFcmToken: "" => "string"
  // 2. user just login, take note that everytime user logout, we will refresh with a new fcmToken for the device
  useEffect(() => {
    if (isAuthenticated && userFcmToken) {
      updateUserFcmToken(userFcmToken);
    }
  }, [isAuthenticated, updateUserFcmToken, userFcmToken]);

  // this will trigger in case the fcmToken changed
  useEffect(() => {
    const fcmSubscriber = messaging().onTokenRefresh((token) => {
      if (isAuthenticated) {
        setFcmToken(token);
        updateUserFcmToken(token);
      }
    });
    return fcmSubscriber;
  });

  const { children } = props;
  return <>{children}</>;
};

export default observer(NotificationProvider);
