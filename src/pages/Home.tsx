import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-4 mb-4">Welcome Home</h1>
          <p className="lead">
            This is the home page of your application. You can add your content here.
          </p>
          <hr className="my-4" />
          <p>
            Navigate to the login page to see the login form in action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
