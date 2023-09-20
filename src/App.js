import React from 'react'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import RoutesConfig from './router/router'

const App = () => {
  return (
      <div className="wrapper">
        <MainHeader />
        <main className="bg-dark text-white main" role="main">
            <RoutesConfig />
        </main>
        <MainFooter />
      </div>
  );
}

export default App