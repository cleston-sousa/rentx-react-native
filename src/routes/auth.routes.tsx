import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Confirmation, IConfirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUpSecondStep';

export interface ISignUpSecondStep {
  name: string;
  email: string;
  driverLicense: string;
}

export type AuthRoutesParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: { user: ISignUpSecondStep };
  Confirmation: { data: IConfirmation };
};

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParamList>();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
