import { Link } from 'react-router-dom';

const ItemDetails = () => {
  // Sample data - replace with actual API call
  const item = {
    publicId: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    price: 999.99,
    stockQuantity: 15,
    categoryName: 'Electronics',
  };

  const isFavourite = false;
  const isLoggedIn = true; // Replace with actual auth check

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add to cart');
  };

  const handleToggleFavourite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Toggle favourite');
  };

  return (
    <div>
      <h1>{item.name}</h1>

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
                  defaultValue={1}
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
