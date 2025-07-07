import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../../shared/styles/Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await dispatch(loginUser({ username, password })).unwrap();
    } catch (error) {
      setErrorMsg('Correo o contraseña incorrectos.');
    }
  };

  useEffect(() => {
    // Redirigir automáticamente después del login
    if (isAuthenticated && user?.role === 'admin') {
      navigate('/dashboard');
    } else if (isAuthenticated && user?.role === 'user') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

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
        {status === 'loading' && <p style={{ color: '#1976d2' }}>Iniciando sesión...</p>}

        <button type="submit" disabled={status === 'loading'}>
          Iniciar sesión
        </button>

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
    </div>
  );
};

export default Login;
