import { useMemo, useState } from "react";

const dishes = [
  {
    name: "Greek salad",
    description: "Crisp lettuce, peppers, olives and our signature feta.",
    price: "$12.99",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Bruchetta",
    description: "Toasted bread with garlic, tomatoes and fresh basil.",
    price: "$5.99",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Grilled fish",
    description: "Seasonal catch, grilled with lemon herb butter.",
    price: "$20.00",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Lemon dessert",
    description: "A bright, creamy classic with a crisp biscuit base.",
    price: "$6.00",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=700&q=80",
  },
];

const testimonials = [
  ["“The freshest Mediterranean food in the city. We will absolutely be back.”", "— Alex R."],
  ["“Warm service, beautiful room and the Greek salad is a must.”", "— Priya S."],
  ["“Little Lemon feels like a sunny holiday in the middle of Chicago.”", "— Jordan M."],
];

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Little Lemon home">
      <span className="logo-mark" aria-hidden="true">🍋</span>
      <span>Little Lemon</span>
    </a>
  );
}

function Header({ onReserve }) {
  const [open, setOpen] = useState(false);
  const links = ["About", "Menu", "Testimonials"];
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {links.map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link} onClick={() => setOpen(false)}>{link}</a>
          ))}
          <button className="button button-small" onClick={() => { setOpen(false); onReserve(); }}>Reserve a table</button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onReserve }) {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Chicago · Mediterranean</p>
          <h1>Little Lemon</h1>
          <h2>Fresh flavors, made with sunshine.</h2>
          <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes with a modern twist and ingredients sourced locally.</p>
          <button className="button" onClick={onReserve}>Reserve a table <span>→</span></button>
        </div>
        <div className="hero-image-wrap">
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" alt="Colorful Mediterranean dish" />
          <div className="floating-card"><strong>Open today</strong><span>11:00 AM — 10:00 PM</span></div>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Starters", "Mains", "Desserts"];
  const visibleDishes = useMemo(() => category === "All" ? dishes : dishes.filter((dish) => dish.category === category), [category]);
  return (
    <section className="section menu-section" id="menu">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">Taste the sunshine</p><h2>Our menu</h2></div>
          <div className="filters" aria-label="Filter menu">
            {categories.map((item) => <button className={category === item ? "filter active" : "filter"} onClick={() => setCategory(item)} key={item}>{item}</button>)}
          </div>
        </div>
        <div className="dish-grid">
          {visibleDishes.map((dish) => (
            <article className="dish-card" key={dish.name}>
              <img src={dish.image} alt={dish.name} />
              <div className="dish-info"><div className="dish-title"><h3>{dish.name}</h3><span>{dish.price}</span></div><p>{dish.description}</p><a href="#reserve">Order for pickup <span>→</span></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-copy"><p className="eyebrow">A little about us</p><h2>Good food.<br /><em>Good people.</em></h2><p>Little Lemon was born from a shared love of our family table. Our chefs combine the bold flavors of the Mediterranean with the best produce Chicago has to offer.</p><p>Come as you are, stay for another round.</p><a className="text-link" href="#menu">Explore our story <span>→</span></a></div>
        <div className="about-images"><img className="about-main" src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=85" alt="People enjoying a meal at Little Lemon" /><img className="about-small" src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=500&q=85" alt="Fresh ingredients on a table" /></div>
      </div>
    </section>
  );
}

function Testimonials() {
  return <section className="section testimonials" id="testimonials"><div className="container"><div className="section-heading centered"><div><p className="eyebrow">From our guests</p><h2>Kind words</h2></div></div><div className="testimonial-grid">{testimonials.map(([quote, name]) => <blockquote key={name}><div className="stars">★★★★★</div><p>{quote}</p><cite>{name}</cite></blockquote>)}</div></div></section>;
}

function Reservation({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  function submit(event) { event.preventDefault(); setSubmitted(true); }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="reserve-title"><button className="close" aria-label="Close reservation form" onClick={onClose}>×</button>{submitted ? <div className="success"><span className="success-icon">✓</span><h2>You're on the list!</h2><p>We saved your reservation request. See you soon at Little Lemon.</p><button className="button" onClick={onClose}>Done</button></div> : <><p className="eyebrow">Join us</p><h2 id="reserve-title">Reserve a table</h2><form onSubmit={submit}><label>Date<input type="date" required defaultValue="2026-10-25" /></label><label>Time<select required defaultValue=""><option value="" disabled>Select a time</option><option>5:30 PM</option><option>7:00 PM</option><option>8:30 PM</option></select></label><label>Guests<select required defaultValue="2"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label><label>Your email<input type="email" placeholder="you@example.com" required /></label><button className="button" type="submit">Find a table <span>→</span></button></form></>}</div></div>;
}

function Footer() {
  return <footer><div className="container footer-grid"><Logo /><div><h3>Visit us</h3><p>123 Citrus Avenue<br />Chicago, IL 60601</p></div><div><h3>Hours</h3><p>Mon–Fri: 11am–10pm<br />Sat–Sun: 10am–11pm</p></div><div><h3>Follow along</h3><p className="socials"><a href="#instagram">Instagram</a><a href="#facebook">Facebook</a></p></div></div><div className="container footer-bottom"><span>© 2026 Little Lemon</span><span>Made with sunshine in Chicago</span></div></footer>;
}

export default function App() {
  const [reservationOpen, setReservationOpen] = useState(false);
  return <><Header onReserve={() => setReservationOpen(true)} /><main><Hero onReserve={() => setReservationOpen(true)} /><Menu /><About /><Testimonials /></main><Footer />{reservationOpen && <Reservation onClose={() => setReservationOpen(false)} />}</>;
}
