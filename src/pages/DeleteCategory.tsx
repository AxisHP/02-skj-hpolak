import { useNavigate } from 'react-router-dom';

const DeleteCategory = () => {
  const navigate = useNavigate();
  // Sample data - replace with actual API call
  const category = {
    publicId: '1',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Delete category');
  };

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
