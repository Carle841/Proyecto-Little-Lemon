import { render, screen } from '@testing-library/react';
import BookingForm from './components/BookingForm';
import { initializeTimes, updateTimes } from './components/bookingTimes';

test('renders the booking form date label', () => {
  render(
    <BookingForm
      availableTimes={initializeTimes()}
      updateTimes={() => {}}
    />,
  );

  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
});

test('initializeTimes returns the expected available times', () => {
  expect(initializeTimes()).toEqual([
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '8:30 PM',
  ]);
});

test('updateTimes keeps the current times for a selected date', () => {
  const currentTimes = initializeTimes();

  expect(updateTimes(currentTimes, {
    type: 'dateChanged',
    date: '2026-10-25',
  })).toEqual(currentTimes);
});
