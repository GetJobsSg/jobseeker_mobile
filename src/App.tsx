import React from 'react';
import RootNavigator from './navigator/root-navigator';
import { AuthProvider } from './modules/auth';
import { RootStoreProvider } from './store/root/root-store-context';
import { RootStore } from './store';

const rootStore = RootStore.create({});

const App = () => (
  <RootStoreProvider value={rootStore}>
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  </RootStoreProvider>
);

export default App;
