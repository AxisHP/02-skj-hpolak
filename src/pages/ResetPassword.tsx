import { useNavigation } from '../contexts/NavigationContext';

const ResetPassword = () => {
  const { setCurrentPage } = useNavigation();
  // Sample data - replace with actual API call
  const user = {
    publicId: '1',
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password');
  };

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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
            <a href="/users" className="btn btn-secondary">
              Cancel
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
