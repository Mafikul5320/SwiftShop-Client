import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomeLayout from "../Layout/HomeLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

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
        }
    ]
}])