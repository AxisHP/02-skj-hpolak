import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../auth/session';
import { getItems } from '../api/catalogApi';
import { getUserOrders } from '../api/ordersApi';

const Home = () => {
  const user = getCurrentUser();
  const [itemCount, setItemCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    getItems().then((items) => setItemCount(items.length)).catch(() => setItemCount(0));
    if (user) {
      getUserOrders(user.publicId).then((orders) => setOrderCount(orders.length)).catch(() => setOrderCount(0));
    }
  }, [user]);

  return (
    <div>
      <h1 className="display-5">Store Dashboard</h1>
      {user ? <p>Signed in as {user.name} {user.lastName}.</p> : <p>Please <Link to="/login">log in</Link> to use cart, favourites and orders.</p>}
      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Catalog Items</h5>
              <p className="card-text fs-3">{itemCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Orders</h5>
              <p className="card-text fs-3">{orderCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
