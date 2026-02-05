import { useNavigation } from '../contexts/NavigationContext';

const Categories = () => {
  const { setCurrentPage } = useNavigation();
  // Sample data - replace with actual API call
  const categories = [
    {
      publicId: '1',
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
    },
    {
      publicId: '2',
      name: 'Clothing',
      description: 'Apparel and fashion items',
    },
    {
      publicId: '3',
      name: 'Books',
      description: 'Books and publications',
    },
  ];

  return (
    <div>
      <h1>Categories</h1>

      <p>
        <button onClick={() => setCurrentPage('/categories/create')} className="btn btn-primary">
          Create New Category
        </button>
      </p>

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
                <button
                  onClick={() => setCurrentPage(`/categories/edit/${category.publicId}`)}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => setCurrentPage(`/categories/delete/${category.publicId}`)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
