import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { format, parseISO, parse } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car } from '../../components/Car';

import { ICar } from '../../dtos/ICar';

import { api } from '../../services/api';
import { dateFormatted } from '../../utils/i18n';

import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  Subtitle,
  Title
} from './styles';

interface ICarResponse {
  id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  car: ICar;
}

export function MyCars() {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<ICarResponse[]>([]);
  const { goBack } = useNavigation();
  const theme = useTheme();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);

      try {
        const response = await api.get(`/rentals`);
        setCars(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status == 404) {
            Alert.alert('Nenhum veiculo.');
          } else {
            console.log('mycars : useEffect : onload : AxiosError ');
            console.log(error.message);
          }
        } else {
          console.log('mycars : useEffect : onload : error');
          console.log(error);
        }
      }

      setLoading(false);
    }

    fetchCars();
  }, [isFocused]);

  function handleGoBack() {
    goBack();
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />
        <Title>Seus agendamento estão aqui.</Title>
        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      {loading && <LoadAnimation />}
      {!loading && (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{format(parseISO(item.start_date.substring(0, 10)), 'dd/MM/yyyy')}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={RFValue(20)}
                      color={theme.colors.title}
                      style={{ marginHorizontal: RFValue(10) }}
                    />
                    <CarFooterDate>{format(parseISO(item.end_date.substring(0, 10)), 'dd/MM/yyyy')}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
