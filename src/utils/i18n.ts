export function numberToCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export function timestampToDate(value: number | string, format: Intl.DateTimeFormatOptions) {
  const date = new Date(value);
  return Intl.DateTimeFormat('pt-BR', format).format(date);
}
