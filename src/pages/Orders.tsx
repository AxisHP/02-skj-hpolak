import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cancelOrder, getAdminOrders, getUserOrders } from '../api/ordersApi';
import type { Order } from '../types/Order';
import { OrderStatus, orderStatusLabel } from '../types/enums';
import { getCurrentUser, isAdmin } from '../auth/session';

const Orders = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const admin = isAdmin(user);
  const missingUserError = !user ? 'You must be logged in to view orders.' : null;
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    if (!user) {
      return;
    }

    try {
      const data = admin ? await getAdminOrders() : await getUserOrders(user.publicId);
      setOrders(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const request = admin ? getAdminOrders() : getUserOrders(user.publicId);
    request
      .then(setOrders)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load orders'));
  }, [admin, user]);

  const handleCancel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const publicId = String(formData.get('publicId'));
    try {
      await cancelOrder(publicId);
      await loadOrders();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      {(missingUserError || error) && <div className="alert alert-danger">{missingUserError ?? error}</div>}

      <table className="table">
        <thead>
          <tr>
            <th>Order Date</th>
            {admin && <th>Customer</th>}
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.publicId}>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              {admin && <td>{order.userName}</td>}
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{orderStatusLabel(order.status)}</td>
              <td>
                <button
                  onClick={() => navigate(`/orders/details/${order.publicId}`)}
                  className="btn btn-sm btn-info"
                >
                  Details
                </button>
                {admin && (
                  <>
                    <button
                      onClick={() => navigate(`/orders/update-status/${order.publicId}`)}
                      className="btn btn-sm btn-warning"
                    >
                      Update Status
                    </button>
                    {order.status !== OrderStatus.Canceled && order.status !== OrderStatus.Delivered && (
                      <form onSubmit={handleCancel} className="d-inline">
                        <input type="hidden" name="publicId" value={order.publicId} />
                        <button type="submit" className="btn btn-sm btn-danger">
                          Cancel
                        </button>
                      </form>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
