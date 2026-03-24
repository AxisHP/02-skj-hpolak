import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  // Sample user data - replace with actual API call
  const users = [
    {
      publicId: '1',
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      dateOfBirth: '1990-01-15',
      phoneNumber: '123-456-7890',
      address: '123 Main St',
      role: 'User',
    },
    {
      publicId: '2',
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      dateOfBirth: '1985-06-20',
      phoneNumber: '987-654-3210',
      address: '456 Oak Ave',
      role: 'Admin',
    },
  ];

  const handleDeleteSelected = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Delete selected users');
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => navigate('/create-user')} className="btn btn-primary">
        Create New User
      </button>

      <form onSubmit={handleDeleteSelected}>
        <button type="submit" className="btn btn-danger mb-3">
          Delete Selected Users
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.publicId}>
                <td>
                  <input
                    type="checkbox"
                    name="selectedUserIds"
                    value={user.publicId}
                  />
                </td>
                <td>
                  <a onClick={() => navigate(`/user-detail/${user.publicId}`)} className="text-decoration-none" style={{cursor: 'pointer'}}>{user.name}</a>
                </td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => navigate(`/update-user/${user.publicId}`)}
                    className="btn btn-warning btn-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => navigate(`/reset-password/${user.publicId}`)}
                    className="btn btn-info btn-sm"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => navigate(`/delete-user/${user.publicId}`)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Users;
