import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from "../components/Loader";

const LogoutView = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('authToken');
        navigate('/login');
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
