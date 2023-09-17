import React, { useState } from 'react';
import { encodeRequestValue } from '../utils/securityHelper'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import {registerUser} from "../service/user";

const RegisterView = () => {
    const [
        formData,
        setFormData
    ] = useState({
        username: '',
        password: '',
    })

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const { username, password } = formData

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        if (!username) {
            setError('Nazwa użytkownika jest wymagana.')

            return
        }

        if (!password) {
            setError('Hasło jest wymagane.')

            return
        }

        try {
            const response = await registerUser({
                username,
                initiallyEncryptedPassword: encodeRequestValue(password)
            })

            if (response.status <= 299) {
                setSuccess('Konto zostało utworzone pomyślnie. Zostaniesz przekierowany na stronę logowania.')

                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        } catch (err) {
            const errorResponse = (err || {}).response

            if (errorResponse.status === 409) {
                setError('Podany użytkownik już istnieje.')
            } else if (errorResponse.status === 400) {
                setError('Wystąpiły błędy podczas walidacji formularza. Sprawdź poprawność wprowadzanych danych.')
            } else {
                setError('Wystąpiły błędy podczas rejestacji. Prosimy o kontakt.')
            }
        }

        setIsLoading(false)
    };

    return (
        <div className="container mt-5 text-center">
            <div className="card custom-bg-primary text-white security-card m-auto">
                <div className="card-body">
                    <h2 className="card-title">
                        Rejestracja
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
                                autoComplete="off"
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
                                {success && (
                                    <div className="alert alert-success">
                                        <p>{success}</p>
                                        <Loader />
                                    </div>
                                )}
                                <button type="submit" className="btn btn-dark">
                                    Zarejestruj
                                </button>
                                <div>
                                    Posiadasz już konto?
                                    <Link to="/login" className="text-warning text-decoration-none mx-2">
                                        Zaloguj się
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

export default RegisterView;