import { fireEvent, render, screen } from '@testing-library/react';
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

function dateOffsetFromToday(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0];
}

function renderBookingForm(submitForm = jest.fn(), updateTimesCallback = jest.fn()) {
  render(
    <BookingForm
      availableTimes={availableTimes}
      updateTimes={updateTimesCallback}
      submitForm={submitForm}
    />,
  );

  return {
    date: screen.getByLabelText(/date/i),
    time: screen.getByLabelText(/time/i),
    guests: screen.getByLabelText(/number of guests/i),
    occasion: screen.getByLabelText(/occasion/i),
    submitForm,
    updateTimesCallback,
  };
}

test('renders a semantically named booking form with labeled controls', () => {
  const { date, time, guests, occasion } = renderBookingForm();

  expect(screen.getByRole('form', { name: /choose your reservation details/i })).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(time).toBeInTheDocument();
  expect(guests).toBeInTheDocument();
  expect(occasion).toBeInTheDocument();
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

test('updates the parent-managed available times when the date changes', () => {
  const { date, updateTimesCallback } = renderBookingForm();
  const selectedDate = dateOffsetFromToday(1);

  fireEvent.change(date, { target: { value: selectedDate } });

  expect(updateTimesCallback).toHaveBeenCalledWith({
    type: 'dateChanged',
    date: selectedDate,
  });
});

test.each([
  ['date', () => dateOffsetFromToday(-1), /today or a future date/i],
  ['time', () => '', /choose an available time/i],
  ['guests', () => '0', /between 1 and 10 guests/i],
  ['guests', () => '11', /between 1 and 10 guests/i],
  ['occasion', () => '', /choose an occasion/i],
])('shows an accessible error and rejects an invalid %s', (field, invalidValue, errorMessage) => {
  const { date, time, guests, occasion, submitForm } = renderBookingForm();
  const fields = { date, time, guests, occasion };
  const selectedField = fields[field];

  fireEvent.change(date, { target: { value: dateOffsetFromToday(1) } });
  fireEvent.change(time, { target: { value: '6:00 PM' } });
  fireEvent.change(guests, { target: { value: '2' } });
  fireEvent.change(occasion, { target: { value: 'birthday' } });
  fireEvent.change(selectedField, { target: { value: invalidValue() } });
  fireEvent.blur(selectedField);

  expect(selectedField).toHaveAttribute('aria-invalid', 'true');
  expect(selectedField).toHaveAccessibleDescription(errorMessage);
  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  expect(screen.getByRole('button', { name: /reserve a table/i })).toBeDisabled();

  fireEvent.submit(screen.getByRole('form', { name: /choose your reservation details/i }));
  expect(submitForm).not.toHaveBeenCalled();
});

test('enables submission and sends valid booking data', () => {
  const { date, time, occasion, submitForm } = renderBookingForm();
  const submitButton = screen.getByRole('button', { name: /reserve a table/i });

  fireEvent.change(date, { target: { value: dateOffsetFromToday(1) } });
  fireEvent.change(time, { target: { value: '6:00 PM' } });
  fireEvent.change(occasion, { target: { value: 'birthday' } });

  expect(submitButton).toBeEnabled();
  fireEvent.click(submitButton);

  expect(submitForm).toHaveBeenCalledWith({
    date: dateOffsetFromToday(1),
    time: '6:00 PM',
    guests: '2',
    occasion: 'birthday',
  });
});
