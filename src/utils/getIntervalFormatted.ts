import { eachDayOfInterval, format, parseISO } from 'date-fns';

import theme from '../styles/theme';

import { IDateProps, IMarkedDatesType } from '../components/Calendar';

export function getIntervalFormatted(start: IDateProps, end: IDateProps) {
  let interval: IMarkedDatesType = {};

  eachDayOfInterval({
    start: parseISO(start.dateString),
    end: parseISO(end.dateString)
  }).forEach((item) => {
    const stringDate = format(item, 'yyyy-MM-dd');

    const isStartOrEnd = start.dateString === stringDate || end.dateString === stringDate;

    interval = {
      ...interval,
      [stringDate]: {
        color: isStartOrEnd ? theme.colors.main : theme.colors.main_light,
        textColor: isStartOrEnd ? theme.colors.main_light : theme.colors.main
      }
    };
  });

  return interval;
}
