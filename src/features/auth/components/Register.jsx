import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../shared/styles/Register.css';

const Register = () => {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para marcar como admin
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validación de correo electrónico
  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : 'Correo inválido');
  };

  // Validación de contraseña segura
  const validatePassword = (value) => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value);
    setPasswordError(isValid ? '' : 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
  };

  // Maneja el envío del formulario de registro
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);

    // Solo registra si no hay errores
    if (!emailError && !passwordError) {
      // Guardar usuario simulado en localStorage
      localStorage.setItem('registeredEmail', email);
      localStorage.setItem('registeredPassword', password);
      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false'); // Guardar si es admin

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

        {/* Checkbox para registrar como administrador */}
        <label style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={e => setIsAdmin(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Registrar como administrador
        </label>
        <span style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
          Marca esta opción solo si eres administrador.
        </span>

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

// /*
// -------------------------------
// Bitácora de aprendizaje
// -------------------------------
// - Se agregó un checkbox para permitir registrar usuarios como administradores.
// - El estado 'isAdmin' se guarda en localStorage junto con el correo y la contraseña.
// - Se agregaron comentarios explicativos para cada parte clave del código.
// - Ahora, al iniciar sesión, el sistema puede saber si el usuario es administrador y proteger rutas según el rol.
// - Aprendí cómo manejar roles de usuario en React usando localStorage y cómo extender un formulario de registro.