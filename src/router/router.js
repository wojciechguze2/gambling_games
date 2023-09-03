import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        async lazy() {
            let HomeView = await import('../views/HomeView')
            return { Component: HomeView.default }
        },
    },
]);

export default router