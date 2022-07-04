import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './stack.routes';

import { IProps } from '../../App';

export function Routes({ onReady }: IProps) {
  return (
    <NavigationContainer onReady={onReady}>
      <StackRoutes />
    </NavigationContainer>
  );
}
