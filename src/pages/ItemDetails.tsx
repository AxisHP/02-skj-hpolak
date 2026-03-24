import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from '../api/catalogApi';
import { addToCart } from '../api/cartApi';
import { addFavourite, getFavourites, removeFavourite } from '../api/favouritesApi';
import type { Item } from '../types/Item';
import { getCurrentUser } from '../auth/session';

const ItemDetails = () => {
  const { id } = useParams();
  const currentUser = getCurrentUser();
  const missingIdError = !id ? 'Missing item id' : null;
  const [item, setItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getItem(id)
      .then(setItem)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load item'));

    if (currentUser) {
      getFavourites(currentUser.publicId)
        .then((favs) => setIsFavourite(favs.some((fav) => fav.itemPublicId === id)))
        .catch(() => setIsFavourite(false));
    }
  }, [id, currentUser]);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !item) {
      setError('You must be logged in to add items to cart.');
      return;
    }

    try {
      await addToCart(currentUser.publicId, item.publicId, quantity);
      setMessage('Item added to cart.');
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
    }
  };

  const handleToggleFavourite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !item) {
      setError('You must be logged in to manage favourites.');
      return;
    }

    try {
      if (isFavourite) {
        await removeFavourite(currentUser.publicId, item.publicId);
        setIsFavourite(false);
        setMessage('Item removed from favourites.');
      } else {
        await addFavourite(currentUser.publicId, item.publicId);
        setIsFavourite(true);
        setMessage('Item added to favourites.');
      }
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update favourites');
    }
  };

  if ((missingIdError || error) && !item) return <div className="alert alert-danger">{missingIdError ?? error}</div>;
  if (!item) return <p>Loading item...</p>;
  const isLoggedIn = Boolean(currentUser);

  return (
    <div>
      <h1>{item.name}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <div className="card w-50">
        <div className="card-body">
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Price:</strong> ${item.price.toFixed(2)}
          </p>
          <p>
            <strong>In Stock:</strong> {item.stockQuantity}
          </p>
          <p>
            <strong>Category:</strong> {item.categoryName}
          </p>

          {isLoggedIn && (
            <div className="mt-3">
              <form onSubmit={handleAddToCart} className="d-inline">
                <input type="hidden" name="itemPublicId" value={item.publicId} />
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  max="1000"
                  className="form-control form-control-sm d-inline-block"
                  size={4}
                />
                <button type="submit" className="btn btn-success">
                  Add to Cart
                </button>
              </form>

              {isFavourite ? (
                <form onSubmit={handleToggleFavourite} className="d-inline">
                  <input type="hidden" name="itemPublicId" value={item.publicId} />
                  <button type="submit" className="btn btn-outline-danger">
                    Remove from Favourites
                  </button>
                </form>
              ) : (
                <form onSubmit={handleToggleFavourite} className="d-inline">
                  <input type="hidden" name="itemPublicId" value={item.publicId} />
                  <button type="submit" className="btn btn-outline-primary">
                    Add to Favourites
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <Link to="/items" className="btn btn-secondary">
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default ItemDetails;
