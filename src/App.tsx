import React from 'react';
import RootNavigator from './navigator/root-navigator';
import { AuthProvider } from './modules/auth';
import { DataProvider, NotificationProvider } from './provider';
import { RootStoreProvider } from './store/root/root-store-context';
import { rootStore } from './store';

const App = () => (
  <RootStoreProvider value={rootStore}>
    <AuthProvider>
      <NotificationProvider>
        <DataProvider>
          <RootNavigator />
        </DataProvider>
      </NotificationProvider>
    </AuthProvider>
  </RootStoreProvider>
);

export default App;
