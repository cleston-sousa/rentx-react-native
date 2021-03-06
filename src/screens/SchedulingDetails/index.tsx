import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackRoutesParamList } from '../../routes/stack.routes';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import {
  Accessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';

import { numberToCurrencyFormatted } from '../../utils/i18n';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';
import axios from 'axios';

export type ScreenProps = NativeStackScreenProps<StackRoutesParamList, 'SchedulingDetails'>;

const userId = 1;

export function SchedulingDetails({ route }: ScreenProps) {
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const { car, period } = route.params;

  const theme = useTheme();
  const { goBack, reset } = useNavigation();

  async function handleConfirmRental() {
    setButtonEnabled(false);
    let unavailableDatesResponse: string[] = [];
    let notFound = false;
    try {
      const response = await api.get(`/schedules_bycars/${car.id}`);
      unavailableDatesResponse = response.data['unavailable_dates'];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status == 404) {
        notFound = true;
      } else {
        Alert.alert('Veículo sujeito a análise de disponibilidade.');
      }
    }

    const unavailableDates = [...unavailableDatesResponse, ...period.interval];

    await api.post(`/schedules_byuser`, {
      user_id: userId,
      startDate: period.startFormatted,
      endDate: period.endFormatted,
      car
    });

    const reservedDates = {
      id: car.id,
      unavailable_dates: unavailableDates
    };

    try {
      if (notFound) {
        await api.post(`/schedules_bycars`, reservedDates);
      } else {
        await api.put(`/schedules_bycars/${car.id}`, reservedDates);
      }
      reset({
        index: 0,
        routes: [
          {
            name: 'Confirmation',
            params: {
              data: {
                title: 'Carro alugado!',
                message: 'Agora você só precisa ir \naté a concessionária da RENTX \npegar o seu automóvel.',
                nextScreenRoute: 'Home'
              }
            }
          }
        ]
      });
    } catch (error) {
      Alert.alert('Não foi possível realizar o agendamento, tente mais tarde novamente.');
    }
    setButtonEnabled(true);
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
            <Period>{car.rent.period}</Period>
            <Price>{numberToCurrencyFormatted(car.rent.price)}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(14)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{period.startFormatted}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.shape} />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{period.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${period.days} diária${
              period.days == 1 ? '' : 's'
            }`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {period.totalAmount}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
          enabled={buttonEnabled}
          loading={!buttonEnabled}
        />
      </Footer>
    </Container>
  );
}
