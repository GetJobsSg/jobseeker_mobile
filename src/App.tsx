import React from 'react';
import RootNavigator from './navigator/root-navigator';
import { AuthProvider } from './modules/auth';
import { DataProvider, NotificationProvider } from './provider';
import { RootStoreProvider } from './store/root/root-store-context';
import { rootStore } from './store';

const App = () => (
  <NotificationProvider>
    <RootStoreProvider value={rootStore}>
      <AuthProvider>
        <DataProvider>
          <RootNavigator />
        </DataProvider>
      </AuthProvider>
    </RootStoreProvider>
  </NotificationProvider>
);

export default App;
