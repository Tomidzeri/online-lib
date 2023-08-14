import React, { useState } from 'react';
import libraryAPI from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Signup({ setToken }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const device = 'DivajsNejm2';

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await libraryAPI.post('/register', {
        name,
        surname,
        email,
        username,
        password,
        password_confirmation: passwordConfirmation,
        device,
      });

      console.log('API Response:', response);

      const { token } = response.data.data;
      setToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
