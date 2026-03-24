import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdminOrderDetails, updateOrderStatus } from '../api/ordersApi';
import type { Order } from '../types/Order';
import { OrderStatus, orderStatusLabel } from '../types/enums';

const UpdateOrderStatus = () => {
  const { id } = useParams();
  const missingIdError = !id ? 'Missing order id' : null;
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.Payed);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getAdminOrderDetails(id)
      .then((data) => {
        setOrder(data);
        setStatus(data.status);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load order'));
  }, [id]);

  const statuses = [
    OrderStatus.Payed,
    OrderStatus.GettingReady,
    OrderStatus.Delivering,
    OrderStatus.Delivered,
    OrderStatus.Canceled,
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateOrderStatus(id, status);
      setMessage('Order status updated.');
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
    }
  };

  if ((missingIdError || error) && !order) return <div className="alert alert-danger">{missingIdError ?? error}</div>;
  if (!order) return <p>Loading order...</p>;

  return (
    <div>
      <h1>Update Order Status</h1>

      <div className="card mb-3 w-50">
        <div className="card-body">
          <p>
            <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
          </p>
          <p>
            <strong>Customer:</strong> {order.userName}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <p>
            <strong>Current Status:</strong> {orderStatusLabel(order.status)}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            New Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select w-auto"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value) as OrderStatus)}
          >
            {statuses.map((orderStatus) => (
              <option key={orderStatus} value={orderStatus}>
                {orderStatusLabel(orderStatus)}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <button type="submit" className="btn btn-primary">
          Update Status
        </button>
        <Link to="/orders" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default UpdateOrderStatus;
