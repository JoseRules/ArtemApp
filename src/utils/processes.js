export const filterAppts = (apptsArray, currentAppts) => {
  const appointmentsArray = apptsArray.map(item => item.slice(0,5));
  const currentAppointments = currentAppts.map(item => item.date.substring(11,16));
  const hola = appointmentsArray.filter(item => {
    if(currentAppointments.includes(item)){return false}
    return true
  })
  return hola;
}