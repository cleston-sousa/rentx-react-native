import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { IProps } from '../../../App';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

export function Home({ onReady }: IProps) {
  const carData = {
    brand: 'AUDI',
    name: 'RS 5 Coupe',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  };

  return (
    <Container onLayout={onReady}>
      <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(105)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Car data={carData} />}
      />
    </Container>
  );
}
