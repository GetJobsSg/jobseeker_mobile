import React from 'react';
import RootNavigator from './navigator/root-navigator';
import { AuthProvider } from './modules/auth';
import { RootStoreProvider } from './store/root/root-store-context';
import { rootStore } from './store';

const App = () => (
  <RootStoreProvider value={rootStore}>
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  </RootStoreProvider>
);

export default App;
