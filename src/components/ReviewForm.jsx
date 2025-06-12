import React, { useState } from "react";

const ReviewForm = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState({ nombre: "", email: "" });

  // Validaciones en tiempo real
  const validate = (name, value) => {
    let error = "";
    if (name === "nombre") {
      if (/\d/.test(value)) {
        error = "El nombre no debe contener números.";
      } else if (!value.trim()) {
        error = "El nombre es obligatorio.";
      }
    }
    if (name === "email") {
      // Expresión regular básica para email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "El email es obligatorio.";
      } else if (!emailRegex.test(value)) {
        error = "Ingresa un email válido.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validar en tiempo real
    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar todos los campos antes de enviar
    const nombreError = validate("nombre", form.nombre);
    const emailError = validate("email", form.email);

    setErrors({ nombre: nombreError, email: emailError });

    if (nombreError || emailError) return;

    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 3000);
  };

  const isFormValid =
    !errors.nombre &&
    !errors.email &&
    form.nombre.trim() &&
    form.email.trim() &&
    form.mensaje.trim();

  return (
    <section id="opiniones" className="review-section">
      <h2 style={{ textAlign: "center" }}>Déjanos tu PQR</h2>
      {enviado && <p className="success-msg">¡Gracias por tu opinión nos pondremos en contacto contigo😊!</p>}
      <form onSubmit={handleSubmit} className="review-form" noValidate>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {errors.nombre && (
          <span style={{ color: "red", fontSize: "0.95em" }}>{errors.nombre}</span>
        )}
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {errors.email && (
          <span style={{ color: "red", fontSize: "0.95em" }}>{errors.email}</span>
        )}
        <textarea
          name="mensaje"
          placeholder="Escribe tu opinión o solicitud"
          value={form.mensaje}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={!isFormValid}>
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ReviewForm;