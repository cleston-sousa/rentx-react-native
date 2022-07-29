import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export interface IProps {
  onReady?: () => void;
}

export function Routes({ onReady }: IProps) {
  const { user } = useAuth();
  const [contentToShow, setContentToShow] = useState(<AuthRoutes />);

  useEffect(() => {
    console.log('routes : user.id : ' + user.id);

    if (user.id) setContentToShow(<AppTabRoutes />);
    else setContentToShow(<AuthRoutes />);
  }, [user]);

  return <NavigationContainer onReady={onReady}>{contentToShow}</NavigationContainer>;
}
