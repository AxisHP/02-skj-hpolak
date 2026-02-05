import React from 'react';
import LoginForm from '../components/Login/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
