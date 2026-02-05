import { useNavigation } from '../contexts/NavigationContext';

const Items = () => {
  const { setCurrentPage } = useNavigation();
  // Sample data - replace with actual API calls
  const categories = [
    { publicId: '1', name: 'Electronics' },
    { publicId: '2', name: 'Clothing' },
  ];

  const items = [
    {
      publicId: '1',
      name: 'Laptop',
      price: 999.99,
      stockQuantity: 15,
      categoryName: 'Electronics',
    },
    {
      publicId: '2',
      name: 'T-Shirt',
      price: 19.99,
      stockQuantity: 50,
      categoryName: 'Clothing',
    },
  ];

  const isAdmin = true; // Replace with actual auth check

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Filter items');
  };

  return (
    <div>
      <h1>Items</h1>

      <div className="mb-3">
        <form onSubmit={handleFilterSubmit} className="d-flex gap-2">
          <select name="categoryId" className="form-select w-auto">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.publicId} value={cat.publicId}>
                {cat.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-secondary">
            Filter
          </button>
        </form>
      </div>

      {isAdmin && (
        <p>
          <button onClick={() => setCurrentPage('/items/create')} className="btn btn-primary">
            Create New Item
          </button>
        </p>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.publicId}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.stockQuantity}</td>
              <td>{item.categoryName}</td>
              <td>
                <button
                  onClick={() => setCurrentPage(`/items/details/${item.publicId}`)}
                  className="btn btn-sm btn-info"
                >
                  Details
                </button>
                {isAdmin && (
                  <>
                    <button
                      onClick={() => setCurrentPage(`/items/edit/${item.publicId}`)}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setCurrentPage(`/items/delete/${item.publicId}`)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
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

export default Items;
