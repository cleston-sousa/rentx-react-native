import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IProps } from '../../../App';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent
} from './styles';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';
import { Button } from '../../components/Button';

const imgTest = 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png';

export function CarDetails({ onReady }: IProps) {
  const { navigate, goBack } = useNavigation();

  function handleChooseDate() {
    navigate('Scheduling');
  }

  function handleGoBack() {
    goBack();
  }
  return (
    <Container onLayout={onReady}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={[imgTest, imgTest, imgTest, imgTest]} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380 km/h" icon={SpeedSvg} />
          <Accessory name="3.2 s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasoline" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 People" icon={PeopleSvg} />
        </Accessories>

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, in vero? Atque odio recusandae expedita
          corrupti eum magnam, reiciendis vel aliquid. Laboriosam inventore obcaecati sint quaerat, laudantium corporis
          cupiditate illo?
        </About>
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleChooseDate} />
      </Footer>
    </Container>
  );
}
