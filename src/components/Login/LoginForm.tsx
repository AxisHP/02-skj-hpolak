import React, { useState } from 'react';
import Input from '../shared/Input';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">Login</button>
            <button type="button" className="btn btn-danger" onClick={() => console.log('Cancel clicked')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
