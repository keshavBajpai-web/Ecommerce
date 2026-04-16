import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ProductList from './admin/ProductList'
import AddProduct from './admin/AddProduct'
import EditProduct from './admin/EditProduct'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import CheckAddress from './pages/CheckAddress'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/cart", element: <Cart /> },
        { path: '/', element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: '/productDetails/:id', element: <ProductDetails /> },
        { path: "/checkAddress", element: <CheckAddress /> },
        { path: "/checkout", element: <Checkout /> },
        {path:"/order-success/:id",element:<OrderSuccess/>},

        { path: '/product', element: <ProductList /> },
        { path: '/AddProduct', element: <AddProduct /> },
        { path: '/EditProduct/:id', element: <EditProduct /> }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
