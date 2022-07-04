import React from 'react';
import { Text } from 'react-native';
import { RectButtonProps, TouchableOpacity } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { numberToCurrencyFormatted } from '../../utils/i18n';

import { Container, Details, Brand, Name, Rent, Period, Price, About, Type, CarImage } from './styles';

interface ICarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface IProps extends RectButtonProps {
  data: ICarData;
}

export function Car({ data, ...rest }: IProps) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{numberToCurrencyFormatted(data.rent.price)}</Price>
          </Rent>
          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </Container>
  );
}
