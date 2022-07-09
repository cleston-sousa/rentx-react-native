import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { api } from '../../services/api';
import { ICar } from '../../dtos/ICar';
import { LoadAnimation } from '../../components/LoadAnimation';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const theme = useTheme();
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  function handleCarDetails(car: ICar) {
    navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigate('MyCars');
  }

  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const myCarsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: posX.value }, { translateY: posY.value }]
    };
  });

  const handleDragMyCars = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx: any) {
      posX.value = ctx.posX + event.translationX;
      posY.value = ctx.posY + event.translationY;
    },
    onEnd(event, ctx: any) {
      posX.value = withSpring(0);
      posY.value = withSpring(0);
    }
  });

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

      <PanGestureHandler onGestureEvent={handleDragMyCars}>
        <Animated.View style={myCarsAnimatedStyle}>
          <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, { backgroundColor: theme.colors.main }]}>
            <Ionicons name="ios-car-sport" size={RFValue(32)} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: RFValue(60),
    width: RFValue(60),
    borderRadius: RFValue(30),

    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    bottom: RFValue(22),
    right: RFValue(22)
  }
});
