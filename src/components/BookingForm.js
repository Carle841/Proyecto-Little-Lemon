import { useState } from 'react';

function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [occasion, setOccasion] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    const formData = { date, time, guests, occasion };
    submitForm(formData);
  }

  return (
    <div className="booking-form-wrapper">
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-form__field">
          <label htmlFor="booking-date">Date</label>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(event) => {
              const selectedDate = event.target.value;
              setDate(selectedDate);
              updateTimes({ type: 'dateChanged', date: selectedDate });
            }}
            required
          />
        </div>

        <div className="booking-form__field">
          <label htmlFor="booking-time">Time</label>
          <select
            id="booking-time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          >
            <option value="" disabled>Select a time</option>
            {availableTimes.map((availableTime) => (
              <option key={availableTime} value={availableTime}>{availableTime}</option>
            ))}
          </select>
        </div>

        <div className="booking-form__field">
          <label htmlFor="booking-guests">Number of guests</label>
          <input
            id="booking-guests"
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            required
          />
        </div>

        <div className="booking-form__field">
          <label htmlFor="booking-occasion">Occasion</label>
          <select
            id="booking-occasion"
            value={occasion}
            onChange={(event) => setOccasion(event.target.value)}
          >
            <option value="">Select an occasion</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
          </select>
        </div>

        <button className="button booking-form__submit" type="submit">
          Reserve a Table
        </button>
        </form>
    </div>
  );
}

export default BookingForm;
