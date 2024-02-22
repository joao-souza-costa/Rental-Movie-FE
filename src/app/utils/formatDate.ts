export function formatDate(date: Date | string) {
  let value = date
  if (typeof value === 'string') value = new Date(date)

  return Intl.DateTimeFormat('pt-br').format(value)
}
