import React from 'react'
import Loader from "./components/Loader"
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'

const App = () => {
  return (
      <div className="wrapper">
        <MainHeader />
        <main>
            <React.Suspense fallback={<Loader />}>
                <RouterProvider router={router} />
            </React.Suspense>
        </main>
        <MainFooter />
      </div>
  );
}

export default App