import React, { useState } from "react";

const initialState = {
  nombre: "",
  email: "",
  telefono: "",
  peticion: "",
};

const initialErrors = {
  nombre: "",
  email: "",
  telefono: "",
  peticion: "",
};

function validate(values) {
  const errors = {};
  if (!values.nombre.trim()) errors.nombre = "El nombre es requerido";
  if (!/^[\w\sáéíóúÁÉÍÓÚñÑ]+$/.test(values.nombre)) errors.nombre = "Nombre inválido";
  if (!values.email) errors.email = "El email es requerido";
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) errors.email = "Email inválido";
  if (!values.telefono) errors.telefono = "El número es requerido";
  else if (!/^\d+$/.test(values.telefono)) errors.telefono = "Solo números";
  if (!values.peticion.trim()) errors.peticion = "La petición es requerida";
  return errors;
}

const ContactForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors(validate({ ...values, [name]: value }));
  };

  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ nombre: true, email: true, telefono: true, peticion: true });
    if (Object.keys(errs).length === 0) {
      // Cambia la URL por la de tu formulario en Formspree
      const res = await fetch('https://formspree.io/f/xkgbwzdl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (res.ok) {
        setEnviado(true);
        setValues(initialState);
        setTouched({});
        setTimeout(() => setEnviado(false), 3000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 32, maxWidth: 400 }}>
      <h3 style={{ color: "#A3FFD6", marginBottom: 16 }}>Déjanos tu petición</h3>
      <div style={{ marginBottom: 16 }}>
        <input
          name="nombre"
          type="text"
          placeholder="Nombre completo"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: errors.nombre && touched.nombre ? "2px solid #ff4d4d" : "1px solid #ccc",
            outline: "none"
          }}
        />
        {errors.nombre && touched.nombre && (
          <span style={{ color: "#ff4d4d", fontSize: 13 }}>{errors.nombre}</span>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: errors.email && touched.email ? "2px solid #ff4d4d" : "1px solid #ccc",
            outline: "none"
          }}
        />
        {errors.email && touched.email && (
          <span style={{ color: "#ff4d4d", fontSize: 13 }}>{errors.email}</span>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          name="telefono"
          type="text"
          placeholder="Número de teléfono"
          value={values.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={15}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: errors.telefono && touched.telefono ? "2px solid #ff4d4d" : "1px solid #ccc",
            outline: "none"
          }}
        />
        {errors.telefono && touched.telefono && (
          <span style={{ color: "#ff4d4d", fontSize: 13 }}>{errors.telefono}</span>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <textarea
          name="peticion"
          placeholder="Escribe tu petición aquí"
          value={values.peticion}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: errors.peticion && touched.peticion ? "2px solid #ff4d4d" : "1px solid #ccc",
            outline: "none",
            resize: "vertical"
          }}
        />
        {errors.peticion && touched.peticion && (
          <span style={{ color: "#ff4d4d", fontSize: 13 }}>{errors.peticion}</span>
        )}
      </div>
      <button
        type="submit"
        style={{
          background: "#A3FFD6",
          color: "#232946",
          fontWeight: "bold",
          padding: "10px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 10px #00ffea"
        }}
      >
        Enviar
      </button>
      {enviado && (
        <div style={{ color: "#00c896", marginTop: 16 }}>
          ¡Petición enviada correctamente!
        </div>
      )}
    </form>
  );
};

export default ContactForm;