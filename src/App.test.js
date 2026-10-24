import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
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

const availableTimes = ['5:00 PM', '6:00 PM', '8:00 PM'];

function tomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

function renderBookingForm(submitForm = jest.fn()) {
  render(
    <BookingForm
      availableTimes={availableTimes}
      updateTimes={() => {}}
      submitForm={submitForm}
    />,
  );

  return {
    date: screen.getByLabelText(/date/i),
    time: screen.getByLabelText(/time/i),
    guests: screen.getByLabelText(/number of guests/i),
    occasion: screen.getByLabelText(/occasion/i),
    submitForm,
  };
}

test('renders the booking form date label', () => {
  expect(renderBookingForm().date).toBeInTheDocument();
});

test('applies HTML5 validation attributes to every booking field', () => {
  const { date, time, guests, occasion } = renderBookingForm();

  expect(date).toBeRequired();
  expect(date).toHaveAttribute('min');
  expect(time).toBeRequired();
  expect(guests).toBeRequired();
  expect(guests).toHaveAttribute('min', '1');
  expect(guests).toHaveAttribute('max', '10');
  expect(occasion).toBeRequired();
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

test('disables submission while booking data is invalid', () => {
  const { submitForm } = renderBookingForm();
  const submitButton = screen.getByRole('button', { name: /reserve a table/i });

  expect(submitButton).toBeDisabled();
  expect(submitForm).not.toHaveBeenCalled();
});

test('enables submission and sends valid booking data', () => {
  const { date, time, occasion, submitForm } = renderBookingForm();
  const submitButton = screen.getByRole('button', { name: /reserve a table/i });

  fireEvent.change(date, { target: { value: tomorrow() } });
  fireEvent.change(time, { target: { value: '6:00 PM' } });
  fireEvent.change(occasion, { target: { value: 'birthday' } });

  expect(submitButton).toBeEnabled();
  fireEvent.click(submitButton);

  expect(submitForm).toHaveBeenCalledWith({
    date: tomorrow(),
    time: '6:00 PM',
    guests: '2',
    occasion: 'birthday',
  });
});
