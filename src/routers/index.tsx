import AuthLayout from "@/views/auth/auth-layout";
import Login from "@/views/auth/login";
import Register, { action as regAction } from "@/views/auth/register";
import { action as loginAction } from '@/views/auth/login';
import Root, { rootLoader } from "@/views/root/root";
import { createBrowserRouter } from "react-router";
import AuthRoot from "@/views/root/auth-root";
import Home from "@/views/home/home";
import AddArticle from "@/views/article/add-article";
import ArticleCategory from "@/views/article/article-category";
import ArticleList from "@/views/article/article-list";
import EditArticle from "@/views/article/edit-article";
import UserPassword from "@/views/user/user-pwd";
import UserInfo, { editUserAction } from "@/views/user/user-info";
import UserAvatar from "@/views/user/user-avatar";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoot><Root /></AuthRoot>,
        loader: rootLoader,
        children: [
            { path: '/home', element: <Home /> },
            { index: true, element: <Home /> },
            { path: 'art-cate', element: <AddArticle /> },
            { path: 'art-list', element: <ArticleCategory /> },
            { path: 'art-add', element: <ArticleList /> },
            { path: 'art-edit/:id', element: <EditArticle /> },
            { path: 'user-info', element: <UserInfo />, action:editUserAction},
            { path: '/user-avatar', element: <UserAvatar /> },
            { path: 'user-pwd', element: <UserPassword /> },
        ]
    },
    {
        path: '/login', element: <AuthLayout><Login /></AuthLayout>, action: loginAction
    },
    {
        path: '/register', element: <AuthLayout><Register /></AuthLayout>, action: regAction
    }
]);

export default router;