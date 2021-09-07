import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Routes } from './routes';

export const linking: LinkingOptions = {
  prefixes: ['https://getjobs.com', 'http://getjobs.com', 'getjobs://'],
  config: {
    // use deeplink url getjobs://home, getjobs://inbox/:id and etc to deeplinking to the target route
    initialRouteName: Routes.bottom_tabs_stack,
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

  // this function will only get trigger when app open from quit state
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      console.log('App is open from quit state via a deeplink url eg: getjobs://route', url);
      return url;
    }

    const message = await messaging().getInitialNotification();
    if (message) {
      console.log(
        'App is open from quit state via notification, retrieve the deeplink url from push notif payload and let react navigation handle the routing',
        message,
      );
      return message?.data?.deepLink;
    }

    // fallback null, just open the app
    return null;
  },

  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => {
      console.log('App is open from background state via deeplink url', url);
      listener(url);
    };
    Linking.addEventListener('url', onReceiveURL);

    const unsubscribeNotification = messaging().onNotificationOpenedApp((message) => {
      const url = message?.data?.deepLink;
      if (url) {
        console.log('App is open from background state via notification', url);
        listener(url);
      }
    });

    return () => {
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};
