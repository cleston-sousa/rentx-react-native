import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { api } from '../../services/api';
import { ICar } from '../../dtos/ICar';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home() {
  const { navigate } = useNavigation();
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCars(isMounted: boolean) {
    try {
      setLoading(true);
      const response = await api.get('/cars');
      isMounted && setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      isMounted && setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;
    fetchCars(isMounted);
    return () => {
      isMounted = false;
    };
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
          {!loading && <TotalCars>{`Total de ${cars.length} carro${cars.length == 1 ? '' : 's'}`}</TotalCars>}
        </HeaderContent>
      </Header>
      {loading && <LoadAnimation />}
      {!loading && (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      )}
    </Container>
  );
}
