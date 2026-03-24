import { Link } from 'react-router-dom';

const DeleteUser = () => {
  // Sample data - replace with actual API call
  const user = {
    publicId: '1',
    name: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Delete user');
  };

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
