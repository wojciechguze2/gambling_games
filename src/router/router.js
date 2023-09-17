import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from '../components/Loader'
import ScrollToTop from '../components/ScrollToTop'

const LazyHomeView = React.lazy(() => import('../views/HomeView'))
const LazyAboutView = React.lazy(() => import('../views/AboutView'))
const LazyContactView = React.lazy(() => import('../views/ContactView'))
const LazyRegulationsView = React.lazy(() => import('../views/RegulationsView'))
const LazyPrivacyPolicyView = React.lazy(() => import('../views/PrivacyPolicyView'))

// user
const LazyRegisterView = React.lazy(() => import('../views/RegisterView'))
const LazyLoginView = React.lazy(() => import('../views/LoginView'))
const LazyLogoutView = React.lazy(() => import('../views/LogoutView'))
const LazyAccountView = React.lazy(() => import('../views/AccountView'))

// games
const LazyGameDemoView = React.lazy(() => import('../views/GameDemoView'))
const LazyGameWheelOfFortuneView = React.lazy(() => import('../views/GameWheelOfFortuneView'))
const LazyGameNumberLotteryView = React.lazy(() => import('../views/GameNumberLotteryView'))
const LazyGameFruitMachineView = React.lazy(() => import('../views/GameFruitMachineView'))

const RoutesConfig = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route index element={<LazyHomeView />} />
                    <Route path="/about" element={<LazyAboutView />} />
                    <Route path="/contact" element={<LazyContactView />} />
                    <Route path="/privacy-policy" element={<LazyPrivacyPolicyView />} />
                    <Route path="/regulations" element={<LazyRegulationsView />} />
                    <Route path="/game/demo" element={<LazyGameDemoView />} />
                    <Route path="/register" element={<LazyRegisterView />} />
                    <Route path="/login" element={<LazyLoginView />} />
                    <Route path="/logout" element={<LazyLogoutView />} />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRoute>
                                <LazyAccountView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/game/wheel-of-fortune"
                        element={
                            <ProtectedRoute>
                                <LazyGameWheelOfFortuneView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/game/number-lottery"
                        element={
                            <ProtectedRoute>
                                <LazyGameNumberLotteryView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/game/fruit-machine"
                        element={
                            <ProtectedRoute>
                                <LazyGameFruitMachineView />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    );
};

export default RoutesConfig;
