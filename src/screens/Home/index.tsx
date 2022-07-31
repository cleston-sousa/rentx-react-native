import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { LoadAnimation } from '../../components/LoadAnimation';
import { Car as CarModel } from '../../database/model/Car';
import { ICar } from '../../dtos/ICar';

export function Home() {
  const { navigate } = useNavigation();
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const netInfo = useNetInfo();

  function handleCarDetails(car: ICar) {
    navigate('CarDetails', { car });
  }

  async function synchronizeCars() {
    if (loading) return;
    console.log('home : synchronizeCars : start');
    setLoading(true);
    try {
      const carsCollection = database.get<CarModel>('cars');
      const carsModel = await carsCollection.query().fetch();
      const cars = carsModel.map(({ id, name, brand, about, fuel_type, period, price, thumbnail }) => {
        return { id, name, brand, about, fuel_type, period, price, thumbnail } as ICar;
      });
      setCars(cars);
    } catch (error) {
      console.log('home : synchronizeCars : error');
      console.log(error);
    }
    console.log('home : synchronizeCars : end');
    setLoading(false);
  }

  async function offlineSync() {
    console.log('home : offlineSync ');
    if (syncing) return;
    console.log('home : offlineSync : start');
    setSyncing(true);

    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        if (user.updated.length > 0) {
          await api.post('/users/sync', user).catch(console.log);
        }
      }
    });
    console.log('home : offlineSync : end');
    synchronizeCars();
    setSyncing(false);
  }

  useEffect(() => {
    console.log('home : useEffect : netInfo.isConnected : ' + netInfo.isConnected);
    if (netInfo.isConnected === true) {
      offlineSync();
    } else if (netInfo.isConnected === false) {
      console.log('home : useEffect : netInfo.isConnected : synchronizeCars');
      synchronizeCars();
    }
  }, [netInfo.isConnected]);

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
