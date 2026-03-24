import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  // Sample data - replace with actual API call
  const orders = [
    {
      publicId: '1',
      orderDate: new Date('2026-02-01T10:30:00'),
      userName: 'John Doe',
      totalAmount: 1059.97,
      status: 'Pending',
    },
    {
      publicId: '2',
      orderDate: new Date('2026-01-28T14:15:00'),
      userName: 'Jane Smith',
      totalAmount: 89.97,
      status: 'Delivered',
    },
  ];

  const isAdmin = true; // Replace with actual auth check

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cancel order');
  };

  return (
    <div>
      <h1>Orders</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Order Date</th>
            {isAdmin && <th>Customer</th>}
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.publicId}>
              <td>{order.orderDate.toLocaleString()}</td>
              {isAdmin && <td>{order.userName}</td>}
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <button
                  onClick={() => navigate(`/orders/details/${order.publicId}`)}
                  className="btn btn-sm btn-info"
                >
                  Details
                </button>
                {isAdmin && (
                  <>
                    <button
                      onClick={() => navigate(`/orders/update-status/${order.publicId}`)}
                      className="btn btn-sm btn-warning"
                    >
                      Update Status
                    </button>
                    {order.status !== 'Canceled' && order.status !== 'Delivered' && (
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
