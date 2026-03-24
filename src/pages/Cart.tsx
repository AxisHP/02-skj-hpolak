import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkout, clearCart, getCart, removeFromCart, updateCartItem } from '../api/cartApi';
import type { CartSummary } from '../types/Cart';
import { getCurrentUser } from '../auth/session';

const Cart = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const missingUserError = !user ? 'You must be logged in to access cart.' : null;
  const [cart, setCart] = useState<CartSummary>({ items: [], total: 0, count: 0 });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadCart = async () => {
    if (!user) {
      return;
    }

    try {
      const summary = await getCart(user.publicId);
      setCart(summary);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    getCart(user.publicId)
      .then(setCart)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load cart'));
  }, [user]);

  const handleUpdateQuantity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const itemPublicId = String(formData.get('ItemPublicId'));
    const quantity = Number(formData.get('Quantity'));

    try {
      await updateCartItem(user.publicId, itemPublicId, quantity);
      await loadCart();
      setMessage('Cart item updated.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item');
    }
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const itemPublicId = String(formData.get('itemPublicId'));

    try {
      await removeFromCart(user.publicId, itemPublicId);
      await loadCart();
      setMessage('Item removed from cart.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to remove cart item');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await checkout(user.publicId);
      await loadCart();
      setMessage('Checkout completed successfully.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    }
  };

  const handleClear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await clearCart(user.publicId);
      await loadCart();
      setMessage('Cart cleared.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
    }
  };

  const cartItems = cart.items;
  const total = cart.total;

  return (
    <div>
      <h1>Shopping Cart</h1>
      {(missingUserError || error) && <div className="alert alert-danger">{missingUserError ?? error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

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
          <button onClick={() => navigate('/items')} className="btn btn-primary">
            Browse Items
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
