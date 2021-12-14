import { combineReducers } from 'redux'

const alerts = (state=[], action) =>
{
  if ( 'SET_ALERTS' == action.type ) {
    return action.payload.append
      ? state.concat(action.payload.alerts)
      : [].concat(action.payload.alerts)
  }

  return state
}

export default combineReducers({
  alerts,
})
