import React from 'react';
import { useTheme } from 'styled-components/native';
import { Calendar as CustomCalendar, DateData, LocaleConfig } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

import { CalendarLocaleConfig } from './LocaleConfig';

LocaleConfig.locales['pt-br'] = CalendarLocaleConfig['pt-br'];
LocaleConfig.defaultLocale = 'pt-br';

export interface IMarkedDatesType {
  [key: string]: MarkingProps;
}

export interface IDateProps extends DateData {}

interface IProps {
  markedDates: IMarkedDatesType;
  onDayPress: (date: IDateProps) => void;
}

export function Calendar({ markedDates, onDayPress }: IProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather size={RFValue(24)} color={theme.colors.text} name={`chevron-${direction}`} />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayFontSize: RFValue(10),
        textMonthFontFamily: theme.fonts.secondary_500,
        textMonthFontSize: RFValue(20),
        monthTextColor: theme.colors.title,
        arrowStyle: { marginHorizontal: -15 }
      }}
      firstDay={1}
      minDate={format(new Date(), 'yyyy-MM-dd')}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}
