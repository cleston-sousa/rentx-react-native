import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUpSecondStep';

import { ICar } from '../dtos/ICar';

export interface IConfirmation {
  title: string;
  message: string;
  nextScreenRoute: keyof StackRoutesParamList;
}

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

export type StackRoutesParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: ISignUpSecondStep };
  Home: undefined;
  CarDetails: { car: ICar };
  Scheduling: { car: ICar };
  SchedulingDetails: {
    car: ICar;
    period: IRentalPeriod;
  };
  Confirmation: { data: IConfirmation };
  MyCars: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<StackRoutesParamList>();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
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
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
