import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdminOrderDetails, getUserOrderDetails } from '../api/ordersApi';
import type { Order } from '../types/Order';
import { orderStatusLabel } from '../types/enums';
import { getCurrentUser, isAdmin } from '../auth/session';

const OrderDetails = () => {
  const { id } = useParams();
  const user = getCurrentUser();
  const missingContextError = !id ? 'Missing order id' : !user ? 'Missing user session' : null;
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) {
      return;
    }

    const request = isAdmin(user)
      ? getAdminOrderDetails(id)
      : getUserOrderDetails(user.publicId, id);

    request
      .then(setOrder)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load order details'));
  }, [id, user]);

  if (missingContextError || error) return <div className="alert alert-danger">{missingContextError ?? error}</div>;
  if (!order) return <p>Loading order...</p>;

  return (
    <div>
      <h1>Order Details</h1>

      <div className="card">
        <div className="card-body">
          <p>
            <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
          </p>
          <p>
            <strong>Customer:</strong> {order.userName}
          </p>
          <p>
            <strong>Status:</strong> {orderStatusLabel(order.status)}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
          </p>

          <h4 className="mt-4">Items</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.publicId}>
                  <td>{item.itemName}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3">
        <Link to="/orders" className="btn btn-secondary">
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
