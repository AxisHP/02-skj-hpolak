import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory } from '../api/catalogApi';
import { updateCategory } from '../api/categoriesApi';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const missingIdError = !id ? 'Missing category id' : null;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getCategory(id)
      .then((cat) => {
        setName(cat.name);
        setDescription(cat.description);
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load category'));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setError(null);
    try {
      await updateCategory(id, { name, description });
      navigate('/categories');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
    }
  };

  return (
    <div>
      <h1>Edit Category</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {(missingIdError || error) && <div className="alert alert-danger">{missingIdError ?? error}</div>}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={() => navigate('/categories')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
