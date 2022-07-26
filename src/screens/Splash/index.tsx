import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const { navigate } = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 25, 50], [0, 50, 100], Extrapolate.CLAMP)
        }
      ]
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateY: interpolate(splashAnimation.value, [0, 25, 50], [-100, 50, 0], Extrapolate.CLAMP)
        }
      ]
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet';
      runOnJS(startApp)();
    });
  }, []);

  function startApp() {
    navigate('SignIn');
  }

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={RFValue(80)} height={RFValue(50)} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={RFValue(180)} height={RFValue(20)} />
      </Animated.View>
    </Container>
  );
}
