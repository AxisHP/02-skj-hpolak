const Home = () => {
  // Sample user data - replace with actual API call
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <div className="text-center">
      <h1 className="display-4">Users list</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="card m-2">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
