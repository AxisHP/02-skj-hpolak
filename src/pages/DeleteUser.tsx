import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getUser } from '../api/usersApi';
import type { User } from '../types/User';

const DeleteUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const missingIdError = !id ? 'Missing user id' : null;
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getUser(id)
      .then(setUser)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load user'));
  }, [id]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await deleteUser(id);
      navigate('/users');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  if (missingIdError || error) return <div className="alert alert-danger">{missingIdError ?? error}</div>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Delete User</h1>
          <h3>Are you sure you want to delete this user?</h3>

          <div className="card">
            <div className="card-body">
              <p>
                <strong>Name:</strong> {user.name} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleDelete} className="mt-3">
            <input type="hidden" name="publicId" value={user.publicId} />
            <button type="submit" className="btn btn-danger">
              Delete
            </button>
            <Link to="/users" className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
