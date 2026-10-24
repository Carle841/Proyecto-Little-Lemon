function Main() {
  return (
    <main>
      <section className="hero" id="about">
        <div className="hero__content">
          <p className="eyebrow">Chicago</p>
          <h1>Little Lemon</h1>
          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <a className="button" href="#reservations">
            Reserve a Table
          </a>
        </div>
        <img
          className="hero__image"
          src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
          alt="Fresh Mediterranean food prepared at Little Lemon"
        />
      </section>
      <section className="specials" id="menu" aria-labelledby="specials-title">
        <div className="section-heading">
          <h2 id="specials-title">This week's specials!</h2>
          <a className="button" href="#order-online">Online Menu</a>
        </div>
        <p>Discover our fresh seasonal dishes, prepared with traditional flavors.</p>
      </section>
    </main>
  );
}

export default Main;
