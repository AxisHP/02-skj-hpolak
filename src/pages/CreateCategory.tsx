import { useNavigation } from '../contexts/NavigationContext';

const CreateCategory = () => {
  const { setCurrentPage } = useNavigation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create category');
  };

  return (
    <div>
      <h1>Create Category</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input id="name" name="name" className="form-control" required />
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
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
        <button type="button" onClick={() => setCurrentPage('/categories')} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
