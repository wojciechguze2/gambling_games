import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../types/authTypes'

const LogoutView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch({ type: LOGOUT })
        navigate('/');
    }, [navigate]);

    return (
        <div className="container mt-5 text-center">
            <div className="card custom-bg-primary text-white w-50 m-auto">
                <div className="card-body">
                    <h2 className="card-title">Wylogowywanie...</h2>
                    <Loader />
                </div>
            </div>
        </div>
    );
};

export default LogoutView;
