import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';

const Register = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/register', { username, password });
      login(res.data.token, username);
    } catch (err) {
      setError(err.response.data.msg || 'Greška prilikom registracije');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registracija</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Korisničko ime" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Lozinka" 
        required 
      />
      <button type="submit">Registruj se</button>
    </form>
  );
};

export default Register;
