import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

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
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: ICar };
  Scheduling: { car: ICar };
  SchedulingDetails: {
    car: ICar;
    period: IRentalPeriod;
  };
  SchedulingComplete: undefined;
  MyCars: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<StackRoutesParamList>();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
