import { useNavigation } from '../contexts/NavigationContext';

const Login = () => {
  const { setCurrentPage } = useNavigation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" onClick={() => setCurrentPage('/')} className="btn btn-secondary">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
