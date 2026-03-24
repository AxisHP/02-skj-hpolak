import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from '../api/catalogApi';
import { deleteItem } from '../api/itemsApi';
import type { Item } from '../types/Item';

const DeleteItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const missingIdError = !id ? 'Missing item id' : null;
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getItem(id)
      .then(setItem)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load item'));
  }, [id]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await deleteItem(id);
      navigate('/items');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  if ((missingIdError || error) && !item) return <div className="alert alert-danger">{missingIdError ?? error}</div>;
  if (!item) return <p>Loading item...</p>;

  return (
    <div>
      <h1>Delete Item</h1>
      <h3>Are you sure you want to delete this item?</h3>

      <div className="card w-50">
        <div className="card-body">
          <p>
            <strong>Name:</strong> {item.name}
          </p>
          <p>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Price:</strong> ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <form onSubmit={handleDelete} className="mt-3">
        <input type="hidden" name="publicId" value={item.publicId} />
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
        <button type="button" onClick={() => navigate('/items')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DeleteItem;
