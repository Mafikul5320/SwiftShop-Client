import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomeLayout from "../Layout/HomeLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Dashboard/DashboardLayout";
import AddProduct from "../Dashboard/Pages/AddProduct";
import ProductDetails from "../Home/Product/ProductDetails";
import AllUser from "../Dashboard/AllUser";
import AllProducts from "../Dashboard/AllProducts";
import UpdateProduct from "../Dashboard/Pages/UpdateProduct";
import ErrorPage from "../Pages/ErrorPage";
import ForbiddenPage from "../Pages/ForbiddenPage";
import AdminRoute from "../Private/AdminRoute";
import ContactPage from "../Pages/ContactPage";
import ComingSoon from "../Pages/ComingSoon";
import AllProduct from "../Pages/AllProduct";
import CategoryProduct from "../Pages/CategoryProduct";
import FavoriteItems from "../Pages/FavoriteItems";

export const Router = createBrowserRouter([{
    path: "/",
    Component: Root,
    children: [
        {
            path: "/",
            Component: HomeLayout
        },
        {
            path: "/login",
            Component: Login
        },
        {
            path: "/register",
            Component: Register
        },
        {
            path: "/product-details/:id",
            Component: ProductDetails

        },
        {
            path: "*",
            Component: ErrorPage
        },
        {
            path: "/forbidden",
            Component: ForbiddenPage
        },
        {
            path: "/contact",
            Component: ContactPage
        },
        {
            path: "/ComingSoon",
            Component: ComingSoon
        },
        {
            path: "/all-product",
            Component: AllProduct
        },
        {
            path: "/category-product/:name",
            Component: CategoryProduct
        },
        {
            path: "/favorite-items",
            Component: FavoriteItems
        }
    ],
},
{
    path: "/dashboard",
    element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
    children: [
        {
            path: "/dashboard",
            Component: DashboardLayout
        },
        {
            path: "add-product",
            Component: AddProduct
        },
        {
            path: "all-user",
            Component: AllUser
        },
        {
            path: "all-product",
            Component: AllProducts
        },
        {
            path: "update-product/:id",
            Component: UpdateProduct
        }
    ]
}

])