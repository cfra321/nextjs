// useLogoutTimer.js
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const useLogoutTimer = () => {
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
        handleLogout();
      }
    }
  }, []); // Empty dependency array means this effect will run once when the component mounts
};

export default useLogoutTimer;
