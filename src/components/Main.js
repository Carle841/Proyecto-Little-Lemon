function Main() {
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
                <a href="#order-online">Order a delivery <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
