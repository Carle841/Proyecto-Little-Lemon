function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <img src="/little-lemon-logo.svg" alt="Little Lemon" />
        <p>Fresh Mediterranean flavors in the heart of Chicago.</p>
      </div>
      <section aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <address>
          123 Lemon Street<br />
          Chicago, IL<br />
          (555) 123-4567
        </address>
      </section>
      <section aria-labelledby="social-title">
        <h2 id="social-title">Follow us</h2>
        <a href="#instagram">Instagram</a>
        <a href="#facebook">Facebook</a>
      </section>
    </footer>
  );
}

export default Footer;
