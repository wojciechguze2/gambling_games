import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLatestGames } from '../service/game'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import MetaTags from "../components/MetaTags";

const HomeView = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const [latestGames, setLatestGames] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const latestGamesData = await getLatestGames()
            setLatestGames(latestGamesData)
        }

        fetchData().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            <MetaTags
                title="Euro-jamniki.pl - demo kasyna internetowego"
                description="gry losowe. Koło fortuny, jednoręki bandyta, loteria liczbowa."
            />
            <div className="homepage">
                <div className="container py-5">
                    <div className="text-center">
                        <h1 className="display-5 fw-bold">
                            Sprawdź swoje szczęście w grach losowych!
                        </h1>
                        <p className="lead fs-5">
                            Ta strona jest przeznaczona wyłącznie do celów demonstracyjnych i rozrywkowych.
                        </p>
                        <p className="lead fw-bold fs-5">
                            Nie ma tutaj możliwości wygrania, przegrania prawdziwych pieniędzy.
                        </p>
                    </div>
                    <div className="text-center my-5">
                        {user ? (
                            <div className="card custom-bg-primary text-white my-3 py-1">
                                <div className="card-header">
                                    <h5 className="card-title">Najnowsze Gry</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {isLoading ? <Loader/> : (
                                            <>
                                                {latestGames && latestGames.map((latestGame, index) => (
                                                    <div key={index} className="col-md-4 mb-4 my-2">
                                                        <div className="card">
                                                            <img
                                                                src={`/images/homepage/latest-games--${latestGame.code}.webp`}
                                                                className="card-img-top cursor-pointer"
                                                                alt={latestGame.name}
                                                                onClick={() => { navigate(`/game/${latestGame.code}`) }}
                                                            />
                                                            <div className="card-body custom-bg-info">
                                                                <p className="card-title fs-5">
                                                                    {latestGame.name}
                                                                </p>
                                                                <Link to={`/game/${latestGame.code}`} className="btn custom-bg-primary border-0 btn-info text-white">
                                                                    Zagraj
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card-deck">
                                <div className="card custom-bg-primary my-3">
                                    <div className="card-body">
                                        <p className="card-title fs-5 fw-bold text-white">
                                            Posiadasz już u nas konto?
                                        </p>
                                        <p className="card-text fs-6 text-white">
                                            Zaloguj się, aby rozpocząć grę
                                        </p>
                                        <Link to="/login" className="btn btn-light fw-bold mx-2">
                                            Zaloguj się
                                        </Link>
                                    </div>
                                </div>
                                <div className="card custom-bg-primary my-3">
                                    <div className="card-body">
                                        <p className="card-title fs-5 fw-bold text-white">
                                            Nie posiadasz jeszcze konta?
                                        </p>
                                        <p className="card-text fs-6 text-white">
                                            Zarejestruj się, aby zdobyć&nbsp;
                                            <span className="w-100 d-block">
                                                <span className="rounded-2 bg-dark text-warning fw-bold">
                                                    1000 bonusowych Euro Jamników na start!
                                                </span>
                                            </span>
                                        </p>
                                        <Link to="/register" className="btn btn-warning fw-bold mx-2">
                                            Zarejestruj się
                                        </Link>
                                    </div>
                                </div>
                                <div className="card custom-bg-primary my-3">
                                    <div className="card-body">
                                        <p className="card-title fs-5 fw-bold text-white">
                                            Nie wiesz na czym polega gra?
                                        </p>
                                        <p className="card-text fs-6 text-white">
                                            Wypróbuj wersję demo!
                                        </p>
                                        <Link to="/game/demo" className="btn btn-dark fw-bold mx-2">
                                            Zagraj w demo
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default HomeView