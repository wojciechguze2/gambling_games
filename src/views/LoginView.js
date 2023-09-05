import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { encodeRequestValue } from '../utils/securityHelper'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../types/authTypes'

const LoginView = () => {
    const [
        formData,
        setFormData
    ] = useState({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const { username, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setSuccess(null)
        setIsLoading(true)
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/login`;

        const postData = {
            username,
            initiallyEncryptedPassword: encodeRequestValue(password)
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        };

        try {
            const response = await fetch(url, requestOptions);

            if (response.ok) {
                setSuccess('Zalogowano pomyślnie.')

                const user = await response.json()

                dispatch({ type: SET_USER, payload: user });

                navigate('/');
            } else if (response.status === 401) {
                setError('Nieprawidłowe dane logowania. Spróbuj ponownie.');
            } else {
                setError('Wystąpiły błędy podczas logowania. Prosimy o kontakt.');
            }
        } catch (err) {
            console.error(err);
            setError('Wystąpiły błędy podczas logowania. Prosimy o kontakt.');
        }

        setIsLoading(false)
    };

    return (
        <div className="container mt-5 text-center">
            <div className="card custom-bg-primary text-white w-50 m-auto">
                <div className="card-body">
                    <h2 className="card-title">
                        Logowanie
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group m-3">
                            <label htmlFor="username">
                                Nazwa użytkownika:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="password">
                                Hasło:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                autoComplete="off"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <button type="submit" className="btn btn-dark">
                                    Zaloguj
                                </button>
                                <div>
                                    Nie posiadasz jeszcze konta?
                                    <Link to="/register" className="text-warning text-decoration-none mx-2">
                                        Zarejestruj się
                                    </Link>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
