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
]);

export default router