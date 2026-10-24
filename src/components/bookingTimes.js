import { fetchAvailableTimes } from '../api';

export function initializeTimes() {
  return fetchAvailableTimes(new Date());
}

export function updateTimes(state, action) {
  if (action.type === 'dateChanged') {
    return fetchAvailableTimes(action.date);
  }

  return state;
}
