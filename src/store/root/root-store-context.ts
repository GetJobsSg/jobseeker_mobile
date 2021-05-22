import { createContext, useContext } from 'react';
import { RootStoreInstance } from './root-store';

const RootStoreContext = createContext<RootStoreInstance>({} as RootStoreInstance);

export const RootStoreProvider = RootStoreContext.Provider;

/** use mobx state tree hook function to retrieve store property */
export const useMst = () => useContext(RootStoreContext);
