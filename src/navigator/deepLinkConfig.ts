import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Routes } from './routes';

export const linking: LinkingOptions = {
  prefixes: ['https://getjobs.com', 'http://getjobs.com', 'getjobs://'],
  config: {
    screens: {
      [Routes.bottom_tabs_stack]: {
        initialRouteName: Routes.bottom_tabs_home,
        screens: {
          [Routes.bottom_tabs_home]: 'home',
          [Routes.bottom_tabs_myjobs]: 'myJobs',
          [Routes.bottom_tabs_inbox]: 'inbox',
          [Routes.bottom_tabs_account]: 'account',
        },
      },
      [Routes.job_stack]: {
        screens: {
          [Routes.job_details]: 'job-details/:id',
        },
      },
      [Routes.inbox_stack]: {
        screens: {
          [Routes.inbox_details]: 'inbox/:id',
        },
      },
    },
  },
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) return url;

    // Check if there is an initial firebase notification
    // Get deep link from data
    // if this is undefined, the app will just open the app
    const message = await messaging().getInitialNotification();
    return message?.data?.deepLink;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);

    // Listen to firebase push notifications
    const unsubscribeNotification = messaging().onNotificationOpenedApp((message) => {
      const url = message?.data?.deepLink;

      if (url) {
        // Any custom logic to check whether the URL needs to be handled
        // Call the listener to let React Navigation handle the URL
        listener(url);
      }
    });

    return () => {
      // Clean up the event listeners
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};
