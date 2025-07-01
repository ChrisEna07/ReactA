import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../shared/styles/Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : 'Correo inválido');
  };

  const validatePassword = (value) => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value);
    setPasswordError(isValid ? '' : 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError) {
      // Guardar usuario simulado
      localStorage.setItem('registeredEmail', email);
      localStorage.setItem('registeredPassword', password);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <label>Correo:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          required
        />
        {emailError && <span className="error">{emailError}</span>}

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />
        {passwordError && <span className="error">{passwordError}</span>}

        <button type="submit">Registrarse</button>

        <button
          type="button"
          style={{
            marginTop: '0.7rem',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '0.5rem 1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Volver a inicio
        </button>
      </form>
    </div>
  );
};

export default Register;