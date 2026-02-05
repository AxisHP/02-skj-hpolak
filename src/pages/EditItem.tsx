import { useNavigation } from '../contexts/NavigationContext';

const EditItem = () => {
  const { setCurrentPage } = useNavigation();
  // Sample data - replace with actual API call based on route params
  const item = {
    publicId: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
    stockQuantity: 15,
    categoryId: '1',
  };

  const categories = [
    { publicId: '1', name: 'Electronics' },
    { publicId: '2', name: 'Clothing' },
    { publicId: '3', name: 'Books' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update item');
  };

  return (
    <div>
      <h1>Edit Item</h1>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="publicId" value={item.publicId} />
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            defaultValue={item.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows={3}
            defaultValue={item.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            name="price"
            className="form-control"
            type="number"
            step="0.01"
            defaultValue={item.price}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stockQuantity" className="form-label">
            Stock Quantity
          </label>
          <input
            id="stockQuantity"
            name="stockQuantity"
            className="form-control"
            type="number"
            defaultValue={item.stockQuantity}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="form-select"
            defaultValue={item.categoryId}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.publicId} value={cat.publicId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={() => setCurrentPage('/items')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditItem;
