import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

import { Profiles } from '../screens/Profiles';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

import HomeSvg from '../assets/home_tab.svg';
import CarSvg from '../assets/car_tab.svg';
import PeopleSvg from '../assets/people_tab.svg';

export type AppTabRoutesParamList = {
  HomeContainer: undefined;
  Profiles: undefined;
  MyCars: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutesParamList>();

export function AppTabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: RFValue(78),
          paddingVertical: Platform.OS === 'ios' ? RFValue(20) : 0,
          backgroundColor: theme.colors.background_primary
        },
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail
      }}
    >
      <Screen
        name="HomeContainer"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ focused, color }) => <HomeSvg width={24} height={24} fill={color} />
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ focused, color }) => <CarSvg width={24} height={24} fill={color} />
        }}
      />
      <Screen
        name="Profiles"
        component={Profiles}
        options={{
          tabBarIcon: ({ focused, color }) => <PeopleSvg width={24} height={24} fill={color} />
        }}
      />
    </Navigator>
  );
}
