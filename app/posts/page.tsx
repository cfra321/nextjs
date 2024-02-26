/* eslint-disable react-hooks/rules-of-hooks */
// posts.js
'use client';

// posts.tsx (assuming you are using TypeScript, otherwise use .js)
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './postPage.module.css';
import Swal from 'sweetalert2';
import localData from '../localData.json';
import HomeFooter from '../components/footerComponent';
import ClientSideComponent from "../client-components/client-side"
import Navbar from '../components/navbarComponent'

interface FormData {
  username: string;
  email: string;
  address: string;
}

const Posts: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    address: '',
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create logic here
    const newPost = {
      id: localData.length + 1,
      username: formData.username,
      email: formData.email,
      address: formData.address,
    };

    // Update localData with the new post
    localData.push(newPost);

    // Optionally, you can save the updated localData to your local storage or perform other actions

    // Clear the form data
    setFormData({
      username: '',
      email: '',
      address: '',
    });

    // Show SweetAlert for success
    Swal.fire({
      icon: 'success',
      title: 'Created!',
      text: 'New post has been created successfully.',
    });
  };

  const handleConfirmation = () => {
    // Show SweetAlert for confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to create a new post.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, call the handleFormSubmit function
        const fakeEvent = { preventDefault: () => { } } as FormEvent<HTMLFormElement>;
        handleFormSubmit(fakeEvent);
      }
    });
  };

  useEffect(() => {

    // Clear authentication status and session expiration time on logout
    const handleLogout = () => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('expirationTime');
    };

    // Set up a timer for automatic logout after x minutes
    const expirationTime = localStorage.getItem('expirationTime');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      Swal.fire({
        icon: 'error',
        title: 'User Not Active',
        text: 'Please contact support to activate your account.',
        timer: 3000
      }).then(() => {
        window.location.href = 'http://localhost:3000';
      });
      return;
    }

    if (expirationTime) {
      const timeRemaining = parseInt(expirationTime, 10) - new Date().getTime();
      if (timeRemaining > 0) {
        const logoutTimer = setTimeout(() => {
          handleLogout();
          Swal.fire({
            icon: 'error',
            title: 'User Not Active',
            text: 'Please contact support to activate your account.'
          }).then(() => {
            window.location.href = 'http://localhost:3000'; // Redirect to login page using React Router
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
          window.location.href = 'http://localhost:3000'; // Redirect to login page using React Router
        });
      }
    }
  }, []);

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>

        <div className={styles.contentBox}>
          <div className={styles.borderForm}>
            <h1 className='font-bold mb-5'> ADD REGISTER DATA TO TABLE </h1>
            <form
              className={styles.formContainer}
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmation();
              }}
              id="postForm"
            >
              <label className={styles.formLabel}>
                Username:
                <input
                  className={styles.formInput}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label className={styles.formLabel}>
                Email:
                <input
                  className={styles.formInput}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label className={styles.formLabel}>
                Address:
                <input
                  className={styles.formInput}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <button className={styles.formButton} type="submit">
                Create
              </button>
            </form>
          </div>
          <div>
            <ClientSideComponent />
          </div>
        </div>
        <HomeFooter />
      </div>
    </>
  );
};

export default Posts;