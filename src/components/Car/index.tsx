import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';
import { numberToCurrency } from '../../utils/i18n';

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

interface IProps {
  data: ICarData;
}

export function Car({ data }: IProps) {
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{numberToCurrency(data.rent.price)}</Price>
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
