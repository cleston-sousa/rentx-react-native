import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { numberToCurrencyFormatted } from '../../utils/i18n';

import { Container, Details, Brand, Name, Rent, Period, Price, About, Type, CarImage } from './styles';
import { ICar } from '../../dtos/ICar';

interface IProps extends RectButtonProps {
  data: ICar;
}

export function Car({ data, ...rest }: IProps) {
  const netInfo = useNetInfo();
  const MotorIconSvg = getAccessoryIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{netInfo.isConnected === true ? numberToCurrencyFormatted(data.price) : '...'}</Price>
          </Rent>
          <Type>
            <MotorIconSvg />
          </Type>
        </About>
      </Details>

      <CarImage resizeMode="contain" source={{ uri: data.thumbnail }} />
    </Container>
  );
}
