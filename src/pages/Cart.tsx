import { useNavigation } from '../contexts/NavigationContext';

const Cart = () => {
  const { setCurrentPage } = useNavigation();
  // Sample cart data - replace with actual state management
  const cartItems = [
    {
      itemPublicId: '1',
      itemName: 'Laptop',
      itemPrice: 999.99,
      quantity: 1,
    },
    {
      itemPublicId: '2',
      itemName: 'Mouse',
      itemPrice: 29.99,
      quantity: 2,
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.itemPrice * item.quantity,
    0
  );

  const handleUpdateQuantity = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update quantity');
  };

  const handleRemove = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Remove item');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checkout');
  };

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Clear cart');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.itemPublicId}>
                  <td>{item.itemName}</td>
                  <td>${item.itemPrice.toFixed(2)}</td>
                  <td>
                    <form onSubmit={handleUpdateQuantity} className="d-inline">
                      <input type="hidden" name="ItemPublicId" value={item.itemPublicId} />
                      <input
                        type="number"
                        name="Quantity"
                        defaultValue={item.quantity}
                        min="0"
                        className="form-control form-control-sm d-inline-block"
                        size={3}
                      />
                      <button type="submit" className="btn btn-sm btn-secondary">
                        Update
                      </button>
                    </form>
                  </td>
                  <td>${(item.itemPrice * item.quantity).toFixed(2)}</td>
                  <td>
                    <form onSubmit={handleRemove} className="d-inline">
                      <input type="hidden" name="itemPublicId" value={item.itemPublicId} />
                      <button type="submit" className="btn btn-sm btn-danger">
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3}>Total</th>
                <th>${total.toFixed(2)}</th>
                <th></th>
              </tr>
            </tfoot>
          </table>

          <div className="mt-3">
            <form onSubmit={handleCheckout} className="d-inline">
              <button type="submit" className="btn btn-success btn-lg">
                Checkout
              </button>
            </form>
            <form onSubmit={handleClear} className="d-inline">
              <button type="submit" className="btn btn-outline-danger">
                Clear Cart
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <p>Your cart is empty.</p>
          <button onClick={() => setCurrentPage('/items')} className="btn btn-primary">
            Browse Items
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
