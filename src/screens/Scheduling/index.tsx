import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { parseISO } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';

import { IRentalPeriod, AppStackRoutesParamList } from '../../routes/app.stack.routes';

import { Calendar, IDateProps, IMarkedDatesType } from '../../components/Calendar';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';

import { Container, Content, DateInfo, DateTitle, DateValue, Footer, Header, RentalPeriod, Title } from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { getIntervalFormatted } from '../../utils/getIntervalFormatted';
import { dateFormatted } from '../../utils/i18n';

export type ScreenProps = NativeStackScreenProps<AppStackRoutesParamList, 'Scheduling'>;

export function Scheduling({ route }: ScreenProps) {
  const netInfo = useNetInfo();
  const { car } = route.params;
  const [lastDateSelected, setLastDateSelected] = useState<IDateProps>({} as IDateProps);
  const [markedDates, setMarkedDates] = useState<IMarkedDatesType>({} as IMarkedDatesType);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);

  const theme = useTheme();
  const { navigate, goBack } = useNavigation();

  function handleConfirmInfo() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert('Selecione um intervalo para alugar');
      return;
    }
    if (unavailableSelected) {
      Alert.alert('Existem datas com indisponibilidade do veículo, por favor selecione outro período');
      return;
    }
    navigate('SchedulingDetails', {
      car,
      period: rentalPeriod
    });
  }

  function handleGoBack() {
    goBack();
  }

  function handleChangeDate(date: IDateProps) {
    let start = !lastDateSelected.timestamp ? date : lastDateSelected;
    let end = date;

    if (start.timestamp > end.timestamp) {
      const toggle = end;
      end = start;
      start = toggle;
    }

    const interval = getIntervalFormatted(start, end);
    const daysList = Object.keys(interval);
    const days = daysList.length;

    setLastDateSelected(date);
    setMarkedDates(interval);
    setRentalPeriod({
      start: start.timestamp,
      startFormatted: dateFormatted(parseISO(start.dateString)),
      end: end.timestamp,
      endFormatted: dateFormatted(parseISO(end.dateString)),
      interval: daysList,
      days,
      totalAmount: days * car.price
    });
  }

  return (
    <Container>
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
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.end}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmInfo}
          enabled={!!rentalPeriod.startFormatted && netInfo.isConnected === true}
        />
      </Footer>
    </Container>
  );
}
