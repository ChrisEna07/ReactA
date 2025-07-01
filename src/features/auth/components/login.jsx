import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../../shared/styles/Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      const storedEmail = localStorage.getItem('registeredEmail');
      const storedPassword = localStorage.getItem('registeredPassword');

      if (username === storedEmail && password === storedPassword) {
        dispatch(loginUser({ username, password }));
        setErrorMsg('');
      } else {
        setErrorMsg('Correo o contraseña incorrectos.');
      }
      setLoading(false);
    }, 1200); // Simula carga de 1.2s
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="login-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <div className="loader"></div>
        <span style={{ marginLeft: 16, fontSize: 18 }}>Iniciando sesión...</span>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <label>Correo:</label>
        <input
          type="email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {errorMsg && <span className="error">{errorMsg}</span>}

        <button type="submit">Iniciar sesión</button>

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

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </form>
      {/* Loader CSS */}
      <style>
        {`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #1976d2;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );
};

export default Login;