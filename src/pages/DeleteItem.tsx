import { useNavigation } from '../contexts/NavigationContext';

const DeleteItem = () => {
  const { setCurrentPage } = useNavigation();
  // Sample data - replace with actual API call
  const item = {
    publicId: '1',
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999.99,
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Delete item');
  };

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
        <button type="button" onClick={() => setCurrentPage('/items')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DeleteItem;
