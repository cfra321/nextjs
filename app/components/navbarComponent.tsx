import React from 'react';
import Image from 'next/image';
import logo from '../image/Amar_Bank.png';
import Swal from 'sweetalert2';


const Navbar = () => {


    const handleLogout = () => {
        // Show SweetAlert confirmation
        Swal.fire({
            title: 'Are you sure',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform logout action here
                console.log('User is logged out!');
                // Clear authentication status
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('expirationTime');
                // Redirect to the homepage
                window.location.href = 'http://localhost:3000';
            }
        });
    };

    return (
        <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-center">
                    <Image
                        src={logo}
                        alt="Amar Bank Logo"
                        width={70}
                        height={80}
                    />
                </div>

                {/* Search box */}
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border p-2 rounded-md mr-2"
                    />

                    {/* Navigation links */}
                    <ul className="flex space-x-4 items-center">
                        <li >
                            <button 
                                className=" py-2 px-4  text-white hover:bg-green-500"
                            >Home
                            </button>
                        </li>
                        <li >
                            <button
                                className=" py-2 px-4  text-white hover:bg-green-500"
                            >About
                            </button>
                        </li>
                        <li >
                            <button 
                                className=" py-2 px-4  text-white hover:bg-green-500"
                            >Contact
                            </button>
                        </li>
                        {/* Use button for Logout with SweetAlert confirmation */}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-green-500 hover:to-green-500 text-white py-2 px-4 rounded-full"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
