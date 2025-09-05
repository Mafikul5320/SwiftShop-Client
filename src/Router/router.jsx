import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomeLayout from "../Layout/HomeLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Dashboard/DashboardLayout";
import AddProduct from "../Dashboard/Pages/AddProduct";
import ProductDetails from "../Home/Product/ProductDetails";

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
        }
    ]
}

])