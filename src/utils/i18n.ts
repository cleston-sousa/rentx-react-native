export function numberToCurrencyFormatted(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export function timestampToDateFormatted(value: number | string, format?: Intl.DateTimeFormatOptions) {
  const date = new Date(value);
  return Intl.DateTimeFormat('pt-BR', format).format(date);
}

export function dateFormatted(value: Date, format?: Intl.DateTimeFormatOptions) {
  return Intl.DateTimeFormat('pt-BR', format).format(value);
}
