import { useMemo, useState } from 'react';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const minimumDate = useMemo(getToday, []);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [occasion, setOccasion] = useState('');
  const [touched, setTouched] = useState({});

  const isDateValid = date !== '' && date >= minimumDate;
  const isTimeValid = availableTimes.includes(time);
  const guestCount = Number(guests);
  const isGuestsValid = Number.isInteger(guestCount) && guestCount >= 1 && guestCount <= 10;
  const isOccasionValid = occasion === 'birthday' || occasion === 'anniversary';
  const isFormValid = isDateValid && isTimeValid && isGuestsValid && isOccasionValid;

  function markTouched(field) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid) {
      setTouched({ date: true, time: true, guests: true, occasion: true });
      return;
    }

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
            min={minimumDate}
            value={date}
            onChange={(event) => {
              const selectedDate = event.target.value;
              setDate(selectedDate);
              updateTimes({ type: 'dateChanged', date: selectedDate });
            }}
            onBlur={() => markTouched('date')}
            required
          />
          {touched.date && !isDateValid && (
            <span className="booking-form__error">Choose today or a future date.</span>
          )}
        </div>

        <div className="booking-form__field">
          <label htmlFor="booking-time">Time</label>
          <select
            id="booking-time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            onBlur={() => markTouched('time')}
            required
          >
            <option value="" disabled>Select a time</option>
            {availableTimes.map((availableTime) => (
              <option key={availableTime} value={availableTime}>{availableTime}</option>
            ))}
          </select>
          {touched.time && !isTimeValid && (
            <span className="booking-form__error">Choose an available time.</span>
          )}
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
            onBlur={() => markTouched('guests')}
            required
          />
          {touched.guests && !isGuestsValid && (
            <span className="booking-form__error">Enter between 1 and 10 guests.</span>
          )}
        </div>

        <div className="booking-form__field">
          <label htmlFor="booking-occasion">Occasion</label>
          <select
            id="booking-occasion"
            value={occasion}
            onChange={(event) => setOccasion(event.target.value)}
            onBlur={() => markTouched('occasion')}
            required
          >
            <option value="">Select an occasion</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
          </select>
          {touched.occasion && !isOccasionValid && (
            <span className="booking-form__error">Choose an occasion.</span>
          )}
        </div>

        <button className="button booking-form__submit" type="submit" disabled={!isFormValid}>
          Reserve a Table
        </button>
        </form>
    </div>
  );
}

export default BookingForm;
