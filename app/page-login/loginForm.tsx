/* eslint-disable @next/next/no-img-element */
// client-side.js
"use client";

// components/LoginForm.js
import React, { useState, useEffect  } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import localData from './localDataLogin.json'; // Import local data
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const user = localData.find(user => user.username === username);
    
    if (user) {
      if (user.isActive) {
        if (user.password === password) {
          // Set authentication status and session expiration time in local storage
          const expirationTime = new Date().getTime() + 10 * 60 * 1000; // x minutes
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('expirationTime', expirationTime.toString());
          
          // Successful login
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have been loggin due and have 10 minute access.',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.href = 'https://my-crud-project-psi.vercel.app/posts';
          });
        } else {
          // Incorrect password
          Swal.fire({
            icon: 'error',
            title: 'Incorrect Password',
            text: 'Please enter the correct password.'
          });
        }
      } else {
        // User not active
        Swal.fire({
          icon: 'error',
          title: 'User Not Active',
          text: 'Please contact support to activate your account.'
        });
      }
    } else {
      // User not found
      Swal.fire({
        icon: 'error',
        title: 'User Not Found',
        text: 'Please check your username and try again.'
      });
    }
  };

  useEffect(() => {
    // Clear authentication status and session expiration time on logout
    const handleLogout = () => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('expirationTime');
    };
  
    // Set up a timer for automatic logout after x minutes
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const timeRemaining = parseInt(expirationTime, 10) - new Date().getTime();
      if (timeRemaining > 0) {
        const logoutTimer = setTimeout(() => {
          handleLogout();
          Swal.fire({
            icon: 'info',
            title: 'Session Expired',
            text: 'You have been logged out due to inactivity.'
          }).then(() => {
            window.location.href = 'https://my-crud-project-psi.vercel.app';
          });
        }, timeRemaining);
        return () => clearTimeout(logoutTimer);
      } else {
        handleLogout();  // Perform logout when the session has already expired
        Swal.fire({
          icon: 'info',
          title: 'Session Expired',
          text: 'You have been logged out due to inactivity.'
        }).then(() => {
          window.location.href = 'https://my-crud-project-psi.vercel.app';
        });
      }
    }
  }, []);
  

  const handleResetPassword = () => {
    // Add logic to initiate the password reset process
    console.log('Reset Password');
    Swal.fire({
      icon: 'info',
      title: 'Fiture  is under maintenace',
      text: 'Please call your customer service and try again.',
      timer: 3000
    });
  };

  const handleRegister = () => {
    // Add logic to initiate the registration process
    console.log('Register');
    Swal.fire({
      icon: 'info',
      title: 'Fiture is under maintenace',
      text: 'Please call your customer service and try again.',
      timer: 3000
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <div className="max-w-md mx-auto mb-8 p-6 bg-white rounded-md shadow-md">
      <div className="mb-2 p-8 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Amar_Bank.png"
          alt="Amar Bank Logo"
          className="mx-auto "
        />
      </div>
      <h1 className="text-2xl font-medium text-gray-600 text-center mb-4 ">LOGIN  SIDE PROJECT</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-2 py-1.5 mt-1.5 mr-2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded-md mb-4 hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex justify-between">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
