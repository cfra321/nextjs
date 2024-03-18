// client-side.js
import React, { useEffect, useState } from "react";
import styles from "./clientPage.module.css";
import Swal from "sweetalert2";

const ClientSideComponent2 = () => {
  const [clientSideUsers, setClientSideUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    username: "",
    phonenumber: "",
    email: "",
    address: "",
  });
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setClientSideUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedUsers = clientSideUsers.filter((user) => user.id !== userId);
        setClientSideUsers(updatedUsers);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'User has been deleted successfully.',
        });
      } else {
        throw new Error('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while deleting the user.',
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
            {clientSideUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
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
                  type="tel"
                  name="phonenumber"
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

export default ClientSideComponent2;
