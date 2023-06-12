import Admin from "../pages/Admin";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import MainShop from "../pages/MainShop";
import ChoiseCategory from "../pages/ChoiseCategory";
import ProductDetail from "../pages/ProductDetail";

export const authRoutes = 
[
    {
        path: '/admin',
        Component: Admin
    },
    {
        path: '/basket',
        Component: Basket
    }
]

export const publicRoutes = 
[
    {
        path: '/shop',
        Component: MainShop
    },
    {
        path: '/product/:id',
        Component: ProductDetail
    },
    {
        path: '/login',
        Component: Auth
    },
    {
        path: '/registration',
        Component: Auth
    },
    {
        path: '/choise-category',
        Component: ChoiseCategory
    },
]