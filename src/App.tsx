import React from 'react';
import RootNavigator from './navigator/root-navigator';
import { AuthProvider } from './modules/auth';
import { NotificationProvider } from './provider';
import { RootStoreProvider } from './store/root/root-store-context';
import { rootStore } from './store';

const App = () => (
  <RootStoreProvider value={rootStore}>
    <AuthProvider>
      <NotificationProvider>
        <RootNavigator />
      </NotificationProvider>
    </AuthProvider>
  </RootStoreProvider>
);

export default App;
