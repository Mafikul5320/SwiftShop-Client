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
        }
    ],
},
{
    path: "/dashboard",
    Component: Dashboard,
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