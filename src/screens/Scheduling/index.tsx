import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';

import { Container, Content, DateInfo, DateTitle, DateValue, Footer, Header, RentalPeriod, Title } from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

interface IProps {
  onReady: () => void;
}

export function Scheduling({ onReady, ...rest }: IProps) {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation();

  function handleConfirmInfo() {
    navigate('SchedulingDetails');
  }

  function handleGoBack() {
    goBack();
  }
  return (
    <Container onLayout={onReady} {...rest}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={false} />
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={true}>16/07/2020</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmInfo} />
      </Footer>
    </Container>
  );
}
