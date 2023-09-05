import React, { useState } from 'react';
import { encodeRequestValue } from '../utils/securityHelper'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

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

        const url = `${process.env.REACT_APP_BACKEND_URL}/api/user/register`

        const postData = {
            username,
            initiallyEncryptedPassword: encodeRequestValue(password)
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }

        try {
            const response = await fetch(url, requestOptions)

            if (response.ok) {
                setSuccess('Konto zostało utworzone pomyślnie. Zostaniesz przekierowany na stronę logowania.')
                navigate('/login')
            } else if (response.status === 409) {
                setError('Podany użytkownik już istnieje.')
            } else if (response.status === 400) {
                setError('Wystąpiły błędy podczas walidacji formularza. Sprawdź poprawność wprowadzanych danych.')
            } else {
                setError('Wystąpiły błędy podczas rejestacji. Prosimy o kontakt.')
            }
        } catch (err) {
            console.error(err)
            setError('Wystąpiły błędy podczas rejestacji. Prosimy o kontakt.')
        }

        setIsLoading(false)
    };

    return (
        <div className="container mt-5 text-center">
            <div className="card custom-bg-primary text-white w-50 m-auto">
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
                                    Zarejestruj
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterView;