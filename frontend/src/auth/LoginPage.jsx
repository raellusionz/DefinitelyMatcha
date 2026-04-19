import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import authService from './authService';

const LoginPage = () => {
  const { setUserId, setUserRole } = useUser();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await authService.login(login, password);
      const { userId, role } = res.data; // adjust to match your API response

      localStorage.setItem('userId', userId);
      localStorage.setItem('userRole', role);

      setUserId(userId);
      setUserRole(role);

      if (role === 'customer') navigate('/merchants');
      if (role === 'merchant') navigate('/dashboard');
    } catch (err) {
      setError('Invalid login or password');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-medium text-gray-900">Sign in</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
          placeholder="Username"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-medium"
          onClick={handleLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;