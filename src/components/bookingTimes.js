export const initialTimes = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '8:30 PM',
];

export function initializeTimes() {
  return initialTimes;
}

export function updateTimes(state, action) {
  if (action.type === 'dateChanged') {
    return state;
  }

  return state;
}
