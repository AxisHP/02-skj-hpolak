import { Link } from 'react-router-dom';

const UpdateOrderStatus = () => {
  // Sample data - replace with actual API call
  const order = {
    publicId: '1',
    orderDate: new Date('2026-02-01T10:30:00'),
    userName: 'John Doe',
    currentStatus: 'Pending',
    totalAmount: 1059.97,
  };

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update order status');
  };

  return (
    <div>
      <h1>Update Order Status</h1>

      <div className="card mb-3 w-50">
        <div className="card-body">
          <p>
            <strong>Order Date:</strong> {order.orderDate.toLocaleString()}
          </p>
          <p>
            <strong>Customer:</strong> {order.userName}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <p>
            <strong>Current Status:</strong> {order.currentStatus}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="publicId" value={order.publicId} />
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            New Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select w-auto"
            defaultValue={order.currentStatus}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
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
