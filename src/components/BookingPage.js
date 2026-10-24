import BookingForm from './BookingForm';

function BookingPage({ availableTimes, updateTimes, submitForm }) {
  return (
    <section className="booking-page">
      <div className="booking-page__intro">
        <p className="eyebrow">Join us in Chicago</p>
        <h1>Reserve a table</h1>
        <p>Make your next meal memorable. Choose your preferred date, time and occasion below.</p>
      </div>
      <BookingForm
        availableTimes={availableTimes}
        updateTimes={updateTimes}
        submitForm={submitForm}
      />
    </section>
  );
}

export default BookingPage;
