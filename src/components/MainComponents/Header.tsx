import { NavLink } from 'react-router-dom';

const Header = () => {
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logout clicked');
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">MyApp</NavLink>
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
                        <NavLink className="nav-link text-dark" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/items">Items</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/users">Users</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/cart">Cart</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/favourites">Favourites</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/orders">Orders</NavLink>
                        </li>
                        <li className="nav-item">
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="btn nav-link text-dark">Logout</button>
                        </form>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/create-user">Register</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/login">Login</NavLink>
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