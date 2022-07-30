import React, { useEffect, useState } from 'react';
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
import { api } from '../../services/api';
import axios from 'axios';
import { Loading } from '../../components/Loading';

export type ScreenProps = NativeStackScreenProps<AppStackRoutesParamList, 'Scheduling'>;

export function Scheduling({ route }: ScreenProps) {
  const netInfo = useNetInfo();
  const { car } = route.params;
  const [lastDateSelected, setLastDateSelected] = useState<IDateProps>({} as IDateProps);
  const [markedDates, setMarkedDates] = useState<IMarkedDatesType>({} as IMarkedDatesType);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod);

  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const [unavailableSelected, setUnavailableSelected] = useState(false);

  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const { navigate, goBack } = useNavigation();

  async function fetchUnavailableDates(isMounted: boolean) {
    isMounted && setLoading(true);
    let unavailableDatesResponse: string[] = [];
    try {
      const response = await api.get(`/schedules_bycars/${car.id}`);
      unavailableDatesResponse = response.data['unavailable_dates'];
    } catch (error) {
      if (!(axios.isAxiosError(error) && error.response && error.response.status == 404)) {
        Alert.alert('Veículo sujeito a análise de disponibilidade.');
      }
    }
    let interval: IMarkedDatesType = {};
    unavailableDatesResponse.forEach((item) => {
      interval = {
        ...interval,
        [item]: {
          disabled: true
        }
      };
    });
    isMounted && setMarkedDates(interval);
    isMounted && setUnavailableDates(unavailableDatesResponse);
    isMounted && setLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    fetchUnavailableDates(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

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

    let interval = getIntervalFormatted(start, end);

    const daysList = Object.keys(interval);
    const days = daysList.length;
    const unavailable = [...unavailableDates];

    let hasUnavailable = false;
    daysList.forEach((item) => {
      if (unavailable.includes(item)) {
        hasUnavailable = true;
        unavailable.splice(unavailable.indexOf(item), 1);
        interval[item].color = theme.colors.title;
        interval[item].textColor = theme.colors.shape;
        interval[item].disabled = true;
      }
    });
    unavailable.forEach((item) => {
      interval = {
        ...interval,
        [item]: { disabled: true }
      };
    });

    setUnavailableSelected(hasUnavailable);
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

      {loading && <Loading />}
      {!loading && (
        <Content>
          <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
        </Content>
      )}

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
