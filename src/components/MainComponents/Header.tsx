import { useNavigation } from '../../contexts/NavigationContext';

const Header = () => {
    const { setCurrentPage } = useNavigation();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logout clicked');
    };

    const navigate = (page: string) => {
        setCurrentPage(page);
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={() => navigate('/')}>MyApp</a>
                    <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/')}>Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/items')}>Items</a>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/users')}>Users</a>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/categories')}>Categories</a>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/cart')}>Cart</a>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/favourites')}>Favourites</a>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/orders')}>Orders</a>
                        </li>
                        <li className="nav-item">
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="btn nav-link text-dark">Logout</button>
                        </form>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/create-user')}>Register</a>
                        </li>
                        <li className="nav-item">
                        <a className="btn nav-link text-dark" onClick={() => navigate('/login')}>Login</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </header>
        </>
    );
}

export default Header;