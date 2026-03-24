import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories, getItems } from '../api/catalogApi';
import type { Category } from '../types/Category';
import type { Item } from '../types/Item';
import { getCurrentUser, isAdmin } from '../auth/session';

const Items = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const admin = isAdmin(getCurrentUser());

  const loadItems = async (selectedCategoryId?: string) => {
    try {
      const data = await getItems(selectedCategoryId);
      setItems(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    }
  };

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load categories'));
    getItems()
      .then(setItems)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load items'));
  }, []);

  const handleFilterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadItems(categoryId || undefined);
  };

  return (
    <div>
      <h1>Items</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <form onSubmit={handleFilterSubmit} className="d-flex gap-2">
          <select name="categoryId" className="form-select w-auto" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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

      {admin && (
        <p>
          <button onClick={() => navigate('/items/create')} className="btn btn-primary">
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
                  onClick={() => navigate(`/items/details/${item.publicId}`)}
                  className="btn btn-sm btn-info"
                >
                  Details
                </button>
                {admin && (
                  <>
                    <button
                      onClick={() => navigate(`/items/edit/${item.publicId}`)}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/items/delete/${item.publicId}`)}
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
