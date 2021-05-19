import React from 'react';
import RootNavigator from './navigator/root-navigator';
import { AuthProvider } from './modules/auth';

const App = () => (
  <AuthProvider>
    <RootNavigator />
  </AuthProvider>
);

export default App;
