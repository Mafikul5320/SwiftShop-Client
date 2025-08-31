import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import HomeLayout from "../Layout/HomeLayout";
 
export const Router = createBrowserRouter([{
    path: "/",
    Component: Root,
    children: [
        {
            path: "/",
            Component: HomeLayout
        }
    ]
}])