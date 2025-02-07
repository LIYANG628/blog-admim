import AuthLayout from "@/views/auth/auth-layout";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import Root from "@/views/root/root";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: '/', element: <Root />
    },
    {
        path: '/login', element: <AuthLayout><Login /></AuthLayout>
    },
    {
        path: '/register', element: <AuthLayout><Register /></AuthLayout>
    }
]);

export default router;