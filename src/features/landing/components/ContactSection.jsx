import React from "react";
import "../../../shared/styles/ContactSection.css";

const ContactSection = () => (
  <section id="contacto" className="contact-section">
    <h2>Te esperamos..!!!!</h2>
    <div className="contact-info contact-info-row">
      <div className="contact-details">
        <p><strong>Dirección:</strong> Calle 123, Fake street</p>
        <p><strong>Teléfono:</strong> +57 312 345 6789</p>
        <p><strong>Email:</strong> contacto@FakeShop.com</p>
      </div>
      <div className="contact-map">
        <iframe
          title="Mapa FakeShop"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-74.08175%2C4.60971%2C-74.08175%2C4.60971&amp;layer=mapnik"
          style={{ border: 0, width: "100%", height: 200 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>
);

export default ContactSection;