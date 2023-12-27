export const dateSQLadapter = (date: Date) => {
  const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

  return utcDate.toISOString().slice(0, 19).replace('T', ' ');
}