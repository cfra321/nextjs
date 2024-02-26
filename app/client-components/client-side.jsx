// client-side.js
"use client";
import React, { useEffect, useState, useRouter } from "react";
import styles from "./clientPage.module.css";
import Swal from "sweetalert2";
import localData from "../localData.json";
import useLogoutTimer from "../server-components/handle-sesion";

const ClientSideComponent = () => {
  const [clientSideUsers, setClientSideUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    username: "",
    email: "",
    address: "",
  });
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // Call the custom hook to handle logout timer
  useLogoutTimer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClientSideUsers(localData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = clientSideUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleDelete = async (userId) => {
    try {
      // Show confirmation alert
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Delete logic here
        const updatedUsers = clientSideUsers.filter(
          (user) => user.id !== userId
        );
        setClientSideUsers(updatedUsers);

        // Show SweetAlert on successful delete
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Show SweetAlert on error (optional)
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while deleting the user.",
      });
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdateFormData({
      id: user.id,
      username: user.username,
      phonenumber: user.phonenumber,
      email: user.email,
      address: user.address,
    });
    setUpdateModalOpen(true);
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    // Update logic here
    const updatedUsers = clientSideUsers.map((user) =>
      user.id === selectedUser.id ? { ...user, ...updateFormData } : user
    );

    setClientSideUsers(updatedUsers);
    setSelectedUser(null);
    setUpdateModalOpen(false);

    // Show SweetAlert on successful update
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "User has been updated successfully.",
    });
  };

  const handleCloseModal = () => {
    setUpdateModalOpen(false);
    setSelectedUser(null);
    setUpdateFormData({
      id: "",
      username: "",
      email: "",
      address: "",
    });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(clientSideUsers.length / usersPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Phonenumber</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.phonenumber}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>

                <td className={styles.actions}>
                  <button
                    className={styles.actionButton2}
                    onClick={() => handleUpdate(user)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.actionButton3}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Form Modal */}
      {isUpdateModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </span>
            <form
              className={styles.formContainer}
              onSubmit={handleUpdateSubmit}
            >
              <label className={styles.formLabel}>
                <a>User Name :</a>
                <input
                  className={styles.formInput}
                  type="text"
                  name="username"
                  value={updateFormData.username}
                  onChange={handleUpdateFormChange}
                />
              </label>
              <label className={styles.formLabel}>
                <a>Email :</a>
                <input
                  className={styles.formInput}
                  type="email"
                  name="email"
                  value={updateFormData.email}
                  onChange={handleUpdateFormChange}
                />
              </label>
              <label className={styles.formLabel}>
                <a>Phonenumber :</a>
                <input
                  className={styles.formInput}
                  type="tel" // Corrected the type attribute to "tel" for phone numbers
                  name="phonenumber" // Corrected the name attribute to "phonenumber"
                  value={updateFormData.phonenumber}
                  onChange={handleUpdateFormChange}
                />
              </label>
              <label className={styles.formLabel}>
                <a>Address :</a>
                <input
                  className={styles.formInput}
                  type="text"
                  name="address"
                  value={updateFormData.address}
                  onChange={handleUpdateFormChange}
                />
              </label>

              <button className={styles.formButton} type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSideComponent;
