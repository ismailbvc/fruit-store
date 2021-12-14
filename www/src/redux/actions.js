export const setAlerts = (alerts, append=true) => ({
  type: 'SET_ALERTS',
  payload: { alerts, append }
})
