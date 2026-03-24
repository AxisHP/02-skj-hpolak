import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategories, getItem } from '../api/catalogApi';
import { updateItem } from '../api/itemsApi';
import type { Category } from '../types/Category';

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const missingIdError = !id ? 'Missing item id' : null;
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    categoryId: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load categories'));

    if (!id) {
      return;
    }

    getItem(id)
      .then((item) => {
        setFormData({
          name: item.name,
          description: item.description,
          price: item.price,
          stockQuantity: item.stockQuantity,
          categoryId: item.categoryId,
        });
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load item'));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setError(null);
    try {
      await updateItem(id, formData);
      navigate('/items');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    }
  };

  return (
    <div>
      <h1>Edit Item</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
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
            value={formData.stockQuantity}
            onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
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
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.publicId} value={cat.publicId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {(missingIdError || error) && <div className="alert alert-danger">{missingIdError ?? error}</div>}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={() => navigate('/items')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditItem;
