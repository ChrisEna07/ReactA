import React from "react";
import "./ContactSection.css";

function ContactSection() {
  return (
    <section className="contact-section" id="contacto">
      <h2>Contacto</h2>
      <div className="contact-content">
        <div className="contact-info">
          <p><b>Teléfono:</b> +34 123 456 789</p>
          <p><b>Email:</b> info@compunet.com</p>
          <p><b>Dirección:</b> Calle PC 123, Ciudad</p>
        </div>
        <iframe
          title="Ubicación"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7038%2C40.4168%2C-3.7038%2C40.4168&amp;layer=mapnik"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default ContactSection;