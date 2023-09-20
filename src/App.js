import React from 'react'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import RoutesConfig from './router/router'
import { HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
      <HelmetProvider>
          <div className="wrapper">
            <MainHeader />
            <main className="bg-dark text-white main" role="main">
                <RoutesConfig />
            </main>
            <MainFooter />
          </div>
      </HelmetProvider>
  );
}

export default App