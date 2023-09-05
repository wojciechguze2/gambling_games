import React from 'react'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import RoutesConfig from './router/router'

const App = () => {
  return (
      <div className="wrapper">
        <MainHeader />
        <main className="min-vh-80 bg-dark text-white" role="main">
            <RoutesConfig />
        </main>
        <MainFooter />
      </div>
  );
}

export default App