export const toSqlDateTimeOrEmpty = (input?: string) => {

  if (!input || typeof input !== `string`) return ``
  const d = new Date(input)
  if (isNaN(d.getTime())) return ``
  return d.toISOString().replace(`T`, ' ').slice(0, 19);
}