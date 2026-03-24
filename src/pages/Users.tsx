import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteUsers, getUsers } from '../api/usersApi';
import type { User } from '../types/User';
import { userRoleLabel } from '../types/enums';
import { getCurrentUser, isAdmin } from '../auth/session';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin(getCurrentUser())) {
      navigate('/');
      return;
    }

    getUsers()
      .then(setUsers)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to fetch users'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleDeleteSelected = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      setError('Select at least one user to delete.');
      return;
    }

    try {
      await deleteUsers(selectedIds);
      setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.publicId)));
      setSelectedIds([]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete selected users');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1>Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
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
                    checked={selectedIds.includes(user.publicId)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds((prev) => [...prev, user.publicId]);
                      } else {
                        setSelectedIds((prev) => prev.filter((id) => id !== user.publicId));
                      }
                    }}
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
                <td>{userRoleLabel(user.role)}</td>
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
