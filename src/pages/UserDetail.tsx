import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/usersApi';
import type { User } from '../types/User';
import { userRoleLabel } from '../types/enums';

const UserDetail = () => {
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

  if (missingIdError || error) return <div className="alert alert-danger">{missingIdError ?? error}</div>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>User Details</h1>

          <div className="card">
            <div className="card-body">
              <p>
                <strong>Name:</strong> {user.name} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Date of Birth:</strong> {user.dateOfBirth}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Role:</strong> {userRoleLabel(user.role)}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <Link
              to={`/update-user/${user.publicId}`}
              className="btn btn-warning"
            >
              Edit
            </Link>
            <Link to="/users" className="btn btn-secondary">
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
