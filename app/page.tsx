// pages/login.js
import React from 'react';
import LoginForm from "./page-login/loginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-r from-blue-500 to-green-300">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
