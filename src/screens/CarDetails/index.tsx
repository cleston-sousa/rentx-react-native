import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackRoutesParamList } from '../../routes/app.stack.routes';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

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

import { numberToCurrencyFormatted } from '../../utils/i18n';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

export type ScreenProps = NativeStackScreenProps<AppStackRoutesParamList, 'CarDetails'>;

export function CarDetails({ route }: ScreenProps) {
  const { navigate, goBack } = useNavigation();
  const { car } = route.params;

  function handleChooseDate() {
    navigate('Scheduling', { car });
  }

  function handleGoBack() {
    goBack();
  }
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{numberToCurrencyFormatted(car.price)}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleChooseDate} />
      </Footer>
    </Container>
  );
}
