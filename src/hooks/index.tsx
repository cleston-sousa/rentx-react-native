import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';

interface IAppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: IAppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
