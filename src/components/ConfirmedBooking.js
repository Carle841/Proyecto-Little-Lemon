import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <section className="content-page confirmation-page">
      <p className="eyebrow">Little Lemon</p>
      <h1>Booking confirmed!</h1>
      <p>Your table is reserved. We look forward to welcoming you to Little Lemon.</p>
      <Link className="button" to="/">Back to home</Link>
    </section>
  );
}

export default ConfirmedBooking;
