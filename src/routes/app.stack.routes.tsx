import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation, IConfirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';

import { ICar } from '../dtos/ICar';

export interface ISignUpSecondStep {
  name: string;
  email: string;
  driverLicense: string;
}

export interface IRentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
  interval: string[];
  days: number;
  totalAmount: number;
}

export type AppStackRoutesParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: ICar };
  Scheduling: { car: ICar };
  SchedulingDetails: {
    car: ICar;
    period: IRentalPeriod;
  };
  Confirmation: { data: IConfirmation };
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackRoutesParamList>();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
