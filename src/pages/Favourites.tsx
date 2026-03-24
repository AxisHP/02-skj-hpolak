import { useNavigate } from 'react-router-dom';

const Favourites = () => {
  const navigate = useNavigate();
  // Sample data - replace with actual API call
  const favourites = [
    {
      itemPublicId: '1',
      itemName: 'Laptop',
      itemPrice: 999.99,
    },
    {
      itemPublicId: '2',
      itemName: 'Wireless Headphones',
      itemPrice: 149.99,
    },
  ];

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add to cart');
  };

  const handleRemove = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Remove from favourites');
  };

  return (
    <div>
      <h1>My Favourites</h1>

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
