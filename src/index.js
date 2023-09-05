// styles
import 'bootstrap/dist/css/bootstrap.css'
import './styles/global.scss';
// js
import 'bootstrap/dist/js/bootstrap'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)

