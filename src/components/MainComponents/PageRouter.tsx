import { Routes, Route } from 'react-router-dom'
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

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/items" element={<Items />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/items/create" element={<CreateItem />} />
      <Route path="/categories/create" element={<CreateCategory />} />
      <Route path="/items/edit" element={<EditItem />} />
      <Route path="/items/edit/:id" element={<EditItem />} />
      <Route path="/categories/edit" element={<EditCategory />} />
      <Route path="/categories/edit/:id" element={<EditCategory />} />
      <Route path="/items/details" element={<ItemDetails />} />
      <Route path="/items/details/:id" element={<ItemDetails />} />
      <Route path="/orders/details" element={<OrderDetails />} />
      <Route path="/orders/details/:id" element={<OrderDetails />} />
      <Route path="/items/delete" element={<DeleteItem />} />
      <Route path="/items/delete/:id" element={<DeleteItem />} />
      <Route path="/categories/delete" element={<DeleteCategory />} />
      <Route path="/categories/delete/:id" element={<DeleteCategory />} />
      <Route path="/update-user/:id" element={<UpdateUser />} />
      <Route path="/delete-user/:id" element={<DeleteUser />} />
      <Route path="/user-detail/:id" element={<UserDetail />} />
      <Route path="/reset-password/:id" element={<ResetPassword />} />
      <Route path="/orders/update-status" element={<UpdateOrderStatus />} />
      <Route path="/orders/update-status/:id" element={<UpdateOrderStatus />} />
    </Routes>
  )
}

export default PageRouter
