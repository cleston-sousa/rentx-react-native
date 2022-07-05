import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { api } from '../../services/api';
import { ICar } from '../../dtos/ICar';
import { Loading } from '../../components/Loading';

export function Home() {
  const { navigate } = useNavigation();

  const [cars, setCars] = useState<ICar[]>([]);

  const [loading, setLoading] = useState(false);

  async function fetchCars() {
    try {
      setLoading(true);
      const response = await api.get('/cars');
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  function handleCarDetails(car: ICar) {
    navigate('CarDetails', { car });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(105)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading && <Loading />}
      <CarList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
      />
    </Container>
  );
}
