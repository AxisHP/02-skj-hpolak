import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, resetPassword } from '../api/usersApi';
import type { User } from '../types/User';

const ResetPassword = () => {
  const { id } = useParams();
  const missingIdError = !id ? 'Missing user id' : null;
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getUser(id)
      .then(setUser)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load user'));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    try {
      await resetPassword(id, newPassword);
      setMessage('Password reset successfully.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    }
  };

  if ((missingIdError || error) && !user) return <div className="alert alert-danger">{missingIdError ?? error}</div>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Reset Password</h1>

          <div className="card mb-3">
            <div className="card-body">
              <p>
                <strong>User:</strong> {user.name} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="publicId" value={user.publicId} />
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
            <button type="submit" className="btn btn-primary">
              Reset Password
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

export default ResetPassword;
