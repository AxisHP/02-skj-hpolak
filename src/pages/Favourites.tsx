import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToCart } from '../api/cartApi';
import { getFavourites, removeFavourite } from '../api/favouritesApi';
import type { Favourite } from '../types/Favourite';
import { getCurrentUser } from '../auth/session';

const Favourites = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const missingUserError = !user ? 'You must be logged in to view favourites.' : null;
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadFavourites = async () => {
    if (!user) {
      return;
    }

    try {
      const data = await getFavourites(user.publicId);
      setFavourites(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load favourites');
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    getFavourites(user.publicId)
      .then(setFavourites)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load favourites'));
  }, [user]);

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    const itemPublicId = String(formData.get('ItemPublicId'));

    try {
      await addToCart(user.publicId, itemPublicId, 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    }
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    const itemPublicId = String(formData.get('itemPublicId'));

    try {
      await removeFavourite(user.publicId, itemPublicId);
      await loadFavourites();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to remove favourite');
    }
  };

  return (
    <div>
      <h1>My Favourites</h1>
      {(missingUserError || error) && <div className="alert alert-danger">{missingUserError ?? error}</div>}

      {favourites.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map((fav) => (
              <tr key={fav.itemPublicId}>
                <td>
                  <a onClick={() => navigate(`/items/details/${fav.itemPublicId}`)} className="text-decoration-none" style={{cursor: 'pointer'}}>{fav.itemName}</a>
                </td>
                <td>${fav.itemPrice.toFixed(2)}</td>
                <td>
                  <form onSubmit={handleAddToCart} className="d-inline">
                    <input type="hidden" name="ItemPublicId" value={fav.itemPublicId} />
                    <input type="hidden" name="Quantity" value="1" />
                    <button type="submit" className="btn btn-sm btn-success">
                      Add to Cart
                    </button>
                  </form>
                  <form onSubmit={handleRemove} className="d-inline">
                    <input type="hidden" name="itemPublicId" value={fav.itemPublicId} />
                    <button type="submit" className="btn btn-sm btn-danger">
                      Remove
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <p>You have no favourites yet.</p>
          <button onClick={() => navigate('/items')} className="btn btn-primary">
            Browse Items
          </button>
        </>
      )}
    </div>
  );
};

export default Favourites;
