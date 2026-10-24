import { useReducer } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import { initializeTimes, updateTimes } from './bookingTimes';
import { submitBooking } from '../api';

export { initializeTimes, updateTimes } from './bookingTimes';

const specials = [
  {
    name: 'Greek salad',
    price: '$12.99',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp lettuce, peppers, olives and our signature feta.',
  },
  {
    name: 'Bruchetta',
    price: '$5.99',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80',
    description: 'Toasted bread with garlic, tomatoes and fresh basil.',
  },
  {
    name: 'Lemon dessert',
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80',
    description: 'A bright, creamy classic with a crisp biscuit base.',
  },
];

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Chicago</p>
          <h1>Little Lemon</h1>
          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <Link className="button" to="/reservations" aria-label="On Click">
            Reserve a Table
          </Link>
        </div>
        <img
          className="hero__image"
          src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
          alt="Fresh Mediterranean food prepared at Little Lemon"
        />
      </section>
      <section className="specials" aria-labelledby="specials-title">
        <div className="section-heading">
          <h2 id="specials-title">This week's specials!</h2>
          <Link className="button" to="/menu">Online Menu</Link>
        </div>
        <p>Discover our fresh seasonal dishes, prepared with traditional flavors.</p>
        <div className="specials__grid">
          {specials.map((special) => (
            <article className="dish-card" key={special.name}>
              <img src={special.image} alt={special.name} />
              <div className="dish-card__body">
                <div className="dish-card__heading">
                  <h3>{special.name}</h3>
                  <span>{special.price}</span>
                </div>
                <p>{special.description}</p>
                <Link to="/order-online">Order a delivery <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContentPage({ title, description, action }) {
  return (
    <section className="content-page">
      <p className="eyebrow">Little Lemon</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {action && <Link className="button" to={action.to}>{action.label}</Link>}
    </section>
  );
}

function Main() {
  const navigate = useNavigate();
  const [availableTimes, updateTimesState] = useReducer(
    updateTimes,
    undefined,
    initializeTimes,
  );

  function submitForm(formData) {
    if (submitBooking(formData)) {
      navigate('/confirmed-booking');
    }
  }

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/about"
          element={<ContentPage title="Our story" description="Little Lemon is a family-owned Mediterranean restaurant bringing traditional recipes and Chicago hospitality to every table." action={{ to: '/reservations', label: 'Reserve a Table' }} />}
        />
        <Route
          path="/menu"
          element={<ContentPage title="Our menu" description="Explore fresh Mediterranean dishes, from our crisp Greek salad to our bright lemon dessert." />}
        />
        <Route
          path="/reservations"
          element={(
            <BookingPage
              availableTimes={availableTimes}
              updateTimes={updateTimesState}
              submitForm={submitForm}
            />
          )}
        />
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
        <Route
          path="/order-online"
          element={<ContentPage title="Order online" description="Take Little Lemon home with easy pickup and delivery options." />}
        />
        <Route
          path="/login"
          element={<ContentPage title="Welcome back" description="Log in to manage your reservations and orders." />}
        />
        <Route path="*" element={<ContentPage title="Page not found" description="The page you are looking for does not exist." action={{ to: '/', label: 'Back home' }} />} />
      </Routes>
    </main>
  );
}

export default Main;
