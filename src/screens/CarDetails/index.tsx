import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';

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
  OfflineInfo,
  Period,
  Price,
  Rent
} from './styles';

import { numberToCurrencyFormatted } from '../../utils/i18n';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { ICar } from '../../dtos/ICar';
import { api } from '../../services/api';

export type ScreenProps = NativeStackScreenProps<AppStackRoutesParamList, 'CarDetails'>;

export function CarDetails({ route }: ScreenProps) {
  const { navigate, goBack } = useNavigation();
  const netInfo = useNetInfo();
  const [carDetails, setCarDetails] = useState<ICar>({} as ICar);
  const { car } = route.params;

  async function fetchCarDetails() {
    const response = await api.get(`/cars/${car.id}`);
    setCarDetails(response.data);
  }

  useEffect(() => {
    console.log('cardetails : useEffect : netInfo.isConnected : ' + netInfo.isConnected);
    if (netInfo.isConnected === true) {
      fetchCarDetails();
    }
  }, [netInfo.isConnected]);

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
        <ImageSlider imageUrl={carDetails.photos ? carDetails.photos : [{ id: car.thumbnail, photo: car.thumbnail }]} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{netInfo.isConnected === true ? numberToCurrencyFormatted(car.price) : '...'}</Price>
          </Rent>
        </Details>

        {carDetails.accessories && (
          <Accessories>
            {carDetails.accessories.map((accessory) => (
              <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleChooseDate} enabled={netInfo.isConnected === true} />
        {netInfo.isConnected !== true && (
          <OfflineInfo>Conecte-se a internet para ver mais detalhes e aproveitar mais do carro.</OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}
