import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createCategory } from '../api/categoriesApi';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createCategory({ name, description });
      navigate('/categories');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    }
  };

  return (
    <div>
      <h1>Create Category</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input id="name" name="name" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
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
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
        <button type="button" onClick={() => navigate('/categories')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
