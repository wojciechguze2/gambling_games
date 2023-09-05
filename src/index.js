// styles
import 'bootstrap/dist/css/bootstrap.css'
import './styles/global.scss';
// js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
const store = configureStore()

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)

