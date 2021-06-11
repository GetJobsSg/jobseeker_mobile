import React from 'react';
import RootNavigator from './navigator/root-navigator';
import { AuthProvider } from './modules/auth';
import { DataProvider } from './provider';
import { RootStoreProvider } from './store/root/root-store-context';
import { rootStore } from './store';

const App = () => (
  <RootStoreProvider value={rootStore}>
    <AuthProvider>
      <DataProvider>
        <RootNavigator />
      </DataProvider>
    </AuthProvider>
  </RootStoreProvider>
);

export default App;
