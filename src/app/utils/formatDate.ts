export function formatDate(date: Date | string | string[]) {
  let value = date

  if (value instanceof Array) {value = new Date(date)}

  if (typeof value === 'string') value = new Date(date)

  return Intl.DateTimeFormat('pt-br').format(value)
}
