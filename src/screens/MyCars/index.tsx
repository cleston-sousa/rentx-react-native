import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Loading } from '../../components/Loading';

import { ICar } from '../../dtos/ICar';

import { api } from '../../services/api';

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
import { FlatList } from 'react-native-gesture-handler';
import { Car } from '../../components/Car';
import { RFValue } from 'react-native-responsive-fontsize';

const userId = 1;

interface ICarResponse {
  id: number;
  user_id: number;
  startDate: string;
  endDate: string;
  car: ICar;
}

export function MyCars() {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<ICarResponse[]>([]);
  const { goBack } = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);

      try {
        const response = await api.get(`/schedules_byuser?user_id=${userId}`);
        setCars(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status == 404) {
          Alert.alert('Nenhum veiculo.');
        }
      }

      setLoading(false);
    }

    fetchCars();
  }, []);

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

      {loading && <Loading />}
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
                    <CarFooterDate>{item.startDate}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={RFValue(20)}
                      color={theme.colors.title}
                      style={{ marginHorizontal: RFValue(10) }}
                    />

                    <CarFooterDate>{item.endDate}</CarFooterDate>
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
