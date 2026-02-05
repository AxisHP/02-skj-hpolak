import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Users from '../../pages/Users'
import Items from '../../pages/Items'
import Categories from '../../pages/Categories'
import Cart from '../../pages/Cart'
import Orders from '../../pages/Orders'
import Favourites from '../../pages/Favourites'
import Privacy from '../../pages/Privacy'
import CreateUser from '../../pages/CreateUser'
import CreateItem from '../../pages/CreateItem'
import CreateCategory from '../../pages/CreateCategory'
import EditItem from '../../pages/EditItem'
import EditCategory from '../../pages/EditCategory'
import ItemDetails from '../../pages/ItemDetails'
import OrderDetails from '../../pages/OrderDetails'
import DeleteItem from '../../pages/DeleteItem'
import DeleteCategory from '../../pages/DeleteCategory'
import UpdateUser from '../../pages/UpdateUser'
import DeleteUser from '../../pages/DeleteUser'
import UserDetail from '../../pages/UserDetail'
import ResetPassword from '../../pages/ResetPassword'
import UpdateOrderStatus from '../../pages/UpdateOrderStatus'

interface PageRouterProps {
  currentPage: string
}

const PageRouter = ({ currentPage }: PageRouterProps) => {
  switch (currentPage) {
    case '/':
      return <Home />
    case '/login':
      return <Login />
    case '/users':
      return <Users />
    case '/items':
      return <Items />
    case '/categories':
      return <Categories />
    case '/cart':
      return <Cart />
    case '/orders':
      return <Orders />
    case '/favourites':
      return <Favourites />
    case '/privacy':
      return <Privacy />
    case '/create-user':
      return <CreateUser />
    case '/items/create':
      return <CreateItem />
    case '/categories/create':
      return <CreateCategory />
    case '/items/edit':
      return <EditItem />
    case '/categories/edit':
      return <EditCategory />
    case '/items/details':
      return <ItemDetails />
    case '/orders/details':
      return <OrderDetails />
    case '/items/delete':
      return <DeleteItem />
    case '/categories/delete':
      return <DeleteCategory />
    case '/update-user':
      return <UpdateUser />
    case '/delete-user':
      return <DeleteUser />
    case '/user-detail':
      return <UserDetail />
    case '/reset-password':
      return <ResetPassword />
    case '/orders/update-status':
      return <UpdateOrderStatus />
    default:
      return <Home />
  }
}

export default PageRouter
