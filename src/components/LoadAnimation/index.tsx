import React from 'react';
import LottieView from 'lottie-react-native';

import { Container } from './styles';

import loadAnimation from '../../assets/load_animation.json';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView source={loadAnimation} style={{ height: 200 }} resizeMode="contain" autoPlay loop />
    </Container>
  );
}
