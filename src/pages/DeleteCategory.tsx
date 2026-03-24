import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory } from '../api/catalogApi';
import { deleteCategory } from '../api/categoriesApi';
import type { Category } from '../types/Category';

const DeleteCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const missingIdError = !id ? 'Missing category id' : null;
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getCategory(id)
      .then(setCategory)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load category'));
  }, [id]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await deleteCategory(id);
      navigate('/categories');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    }
  };

  if ((missingIdError || error) && !category) return <div className="alert alert-danger">{missingIdError ?? error}</div>;
  if (!category) return <p>Loading category...</p>;

  return (
    <div>
      <h1>Delete Category</h1>
      <h3>Are you sure you want to delete this category?</h3>

      <div className="card w-50">
        <div className="card-body">
          <p>
            <strong>Name:</strong> {category.name}
          </p>
          <p>
            <strong>Description:</strong> {category.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleDelete} className="mt-3">
        <input type="hidden" name="publicId" value={category.publicId} />
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
        <button type="button" onClick={() => navigate('/categories')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DeleteCategory;
