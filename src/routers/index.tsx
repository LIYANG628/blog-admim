import AuthLayout from "@/views/auth/auth-layout";
import Login from "@/views/auth/login";
import Register, { action as regAction } from "@/views/auth/register";
import { action as loginAction } from '@/views/auth/login';
import Root from "@/views/root/root";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: '/', element: <Root />
    },
    {
        path: '/login', element: <AuthLayout><Login /></AuthLayout>, action: loginAction
    },
    {
        path: '/register', element: <AuthLayout><Register /></AuthLayout>, action: regAction
    }
]);

export default router;