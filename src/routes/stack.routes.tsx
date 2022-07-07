import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { ICar } from '../dtos/ICar';

export interface IRentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
  interval: string[];
  days: number;
  totalAmount: number;
}

export type StackRoutesParamList = {
  Home: undefined;
  CarDetails: { car: ICar };
  Scheduling: { car: ICar };
  SchedulingDetails: {
    car: ICar;
    period: IRentalPeriod;
  };
  SchedulingComplete: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<StackRoutesParamList>();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
}
