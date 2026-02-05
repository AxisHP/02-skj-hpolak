import { useNavigation } from '../contexts/NavigationContext';

const EditCategory = () => {
  const { setCurrentPage } = useNavigation();
  // Sample data - replace with actual API call
  const category = {
    publicId: '1',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update category');
  };

  return (
    <div>
      <h1>Edit Category</h1>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="publicId" value={category.publicId} />
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            defaultValue={category.name}
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
            defaultValue={category.description}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" onClick={() => setCurrentPage('/categories')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
