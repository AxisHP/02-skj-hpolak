import { useNavigate } from 'react-router-dom';

const CreateItem = () => {
  const navigate = useNavigate();
  // Sample categories - replace with actual API call
  const categories = [
    { publicId: '1', name: 'Electronics' },
    { publicId: '2', name: 'Clothing' },
    { publicId: '3', name: 'Books' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create item');
  };

  return (
    <div>
      <h1>Create Item</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input id="name" name="name" className="form-control" />
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select id="categoryId" name="categoryId" className="form-select">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.publicId} value={cat.publicId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
        <button type="button" onClick={() => navigate('/items')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
