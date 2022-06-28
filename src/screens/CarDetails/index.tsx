import React from 'react';
import { StatusBar } from 'react-native';
import { IProps } from '../../../App';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { CarImage, Container, Header } from './styles';

const imgTest = 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png';

export function CarDetails({ onReady }: IProps) {
  return (
    <Container onLayout={onReady}>
      <StatusBar barStyle={'dark-content'} backgroundColor="transparent" translucent />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImage>
        <ImageSlider imageUrl={[imgTest, imgTest, imgTest, imgTest]} />
      </CarImage>
    </Container>
  );
}
