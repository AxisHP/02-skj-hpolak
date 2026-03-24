import { Link } from 'react-router-dom';

const UserDetail = () => {
  // Sample data - replace with actual API call
  const user = {
    publicId: '1',
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    dateOfBirth: '1990-01-15',
    phoneNumber: '123-456-7890',
    address: '123 Main St',
    role: 'User',
  };

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
                <strong>Role:</strong> {user.role}
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
