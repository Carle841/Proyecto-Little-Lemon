import { render, screen } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import { initializeTimes, updateTimes } from './components/bookingTimes';

beforeEach(() => {
  window.fetchAPI = jest.fn((date) => (
    date === '2026-10-25'
      ? ['5:30 PM', '7:00 PM']
      : ['5:00 PM', '6:00 PM', '8:00 PM']
  ));
});

afterEach(() => {
  delete window.fetchAPI;
});

test('renders the booking form date label', () => {
  render(
    <BookingForm
      availableTimes={initializeTimes()}
      updateTimes={() => {}}
      submitForm={() => {}}
    />,
  );

  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
});

test('initializeTimes returns the expected available times', () => {
  const availableTimes = initializeTimes();

  expect(availableTimes).toEqual(['5:00 PM', '6:00 PM', '8:00 PM']);
  expect(availableTimes).not.toHaveLength(0);
  expect(window.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
});

test('updateTimes returns available times for the selected date', () => {
  const currentTimes = ['5:00 PM', '6:00 PM', '8:00 PM'];

  const availableTimes = updateTimes(currentTimes, {
    type: 'dateChanged',
    date: '2026-10-25',
  });

  expect(availableTimes).toEqual(['5:30 PM', '7:00 PM']);
  expect(availableTimes).not.toHaveLength(0);
  expect(window.fetchAPI).toHaveBeenCalledWith('2026-10-25');
});
