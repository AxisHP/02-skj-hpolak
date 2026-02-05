import { useNavigation } from '../contexts/NavigationContext';

const OrderDetails = () => {
  const { setCurrentPage } = useNavigation();
  // Sample data - replace with actual API call
  const order = {
    publicId: '1',
    orderDate: new Date('2026-02-01T10:30:00'),
    userName: 'John Doe',
    status: 'Pending',
    totalAmount: 1059.97,
    items: [
      {
        itemName: 'Laptop',
        price: 999.99,
        quantity: 1,
      },
      {
        itemName: 'Mouse',
        price: 29.99,
        quantity: 2,
      },
    ],
  };

  return (
    <div>
      <h1>Order Details</h1>

      <div className="card">
        <div className="card-body">
          <p>
            <strong>Order Date:</strong> {order.orderDate.toLocaleString()}
          </p>
          <p>
            <strong>Customer:</strong> {order.userName}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
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
              {order.items.map((item, index) => (
                <tr key={index}>
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
        <a href="/orders" className="btn btn-secondary">
          Back to Orders
        </a>
      </div>
    </div>
  );
};

export default OrderDetails;
