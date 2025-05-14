import { APP_ROUTES } from "../constants/route.constant";
import Layout from "../layouts/app.layout";
import { AuthLayout } from "../layouts/auth.layout";
import { ProtectedRoute } from "../routers/protected.route";
import LoginScreen from "../pages/login-register/index";
import { lazy } from "react";

const HomeScreen = lazy(() => import("../pages/home/index"));
const BlogScreen = lazy(() => import("../pages/blog/index"));
const MyBlogsScreen = lazy(() => import("../pages/myblog/index"));
const MyFavoritesScreen = lazy(() => import("../pages/favorites/index"));

// Application routes configuration
export const ROUTE_CONFIG = [
  {
    path: APP_ROUTES.ROOT,
    layout: Layout,
    guard: ProtectedRoute,
    redirectTo: APP_ROUTES.HOME,
    children: [
        { path: APP_ROUTES.ROOT, element: HomeScreen },
        { path: APP_ROUTES.HOME, element: HomeScreen },
        { path: APP_ROUTES.BLOG, element: BlogScreen },
        { path: APP_ROUTES.MY_BLOGS, element: MyBlogsScreen },
        { path: APP_ROUTES.FAVORITES, element: MyFavoritesScreen }
    ],
  },
  {
    path: APP_ROUTES.LOGIN,
    layout: AuthLayout,
    children: [
      { path: APP_ROUTES.LOGIN, element: LoginScreen },
    ],
  },
];