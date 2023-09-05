import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        async lazy() {
            let HomeView = await import('../views/HomeView')
            return { Component: HomeView.default }
        },
    },
    {
        path: "/game/demo",
        async lazy() {
            let GameDemoView = await import('../views/GameDemoView')
            return { Component: GameDemoView.default }
        },
    },
    {
        path: "/register",
        async lazy() {
            let RegisterView = await import('../views/RegisterView')
            return { Component: RegisterView.default }
        },
    },
    {
        path: "/login",
        async lazy() {
            let LoginView = await import('../views/LoginView')
            return { Component: LoginView.default }
        },
    },
    {
        path: "/logout",
        async lazy() {
            let LogoutView = await import('../views/LogoutView')
            return { Component: LogoutView.default }
        },
    },
]);

export default router