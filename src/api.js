export function fetchAvailableTimes(date) {
  if (typeof window.fetchAPI !== 'function') {
    throw new Error('The booking API is not available.');
  }

  return window.fetchAPI(date);
}

export function submitBooking(formData) {
  if (typeof window.submitAPI !== 'function') {
    throw new Error('The booking API is not available.');
  }

  return window.submitAPI(formData);
}
