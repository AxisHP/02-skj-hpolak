import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from '../api/catalogApi';
import type { Category } from '../types/Category';
import { getCurrentUser, isAdmin } from '../auth/session';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const admin = isAdmin(getCurrentUser());

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load categories'));
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {admin && (
        <p>
          <button onClick={() => navigate('/categories/create')} className="btn btn-primary">
            Create New Category
          </button>
        </p>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.publicId}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {admin && (
                  <>
                    <button
                      onClick={() => navigate(`/categories/edit/${category.publicId}`)}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/categories/delete/${category.publicId}`)}
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

export default Categories;
