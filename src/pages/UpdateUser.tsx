import { useNavigation } from '../contexts/NavigationContext';

const UpdateUser = () => {
  const { setCurrentPage } = useNavigation();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update user');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1>Update User</h1>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="publicId" value={user.publicId} />
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="form-control"
                defaultValue={user.name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                className="form-control"
                defaultValue={user.lastName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                defaultValue={user.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="form-control"
                defaultValue={user.dateOfBirth}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                defaultValue={user.phoneNumber}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                id="address"
                name="address"
                className="form-control"
                defaultValue={user.address}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="form-select"
                defaultValue={user.role}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
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

export default UpdateUser;
