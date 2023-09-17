import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLatestGames } from '../service/game'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'

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
                        <div className="card custom-bg-primary text-white m-5">
                            <div className="card-header">
                                <h5 className="card-title">Najnowsze Gry</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {isLoading ? <Loader/> : (
                                        <>
                                            {latestGames && latestGames.map((latestGame, index) => (
                                                <div key={index} className="col-md-4 mb-4">
                                                    <div className="card">
                                                        <img
                                                            src={`/images/homepage/latest-games--${latestGame.code}.webp`}
                                                            className="card-img-top cursor-pointer"
                                                            alt={latestGame.name}
                                                            onClick={() => { navigate(`/game/${latestGame.code}`) }}
                                                        />
                                                        <div className="card-body custom-bg-info">
                                                            <h5 className="card-title">
                                                                {latestGame.name}
                                                            </h5>
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
                        <div className="card custom-bg-primary m-5">
                            <div className="card-body">
                                <h5 className="card-title fs-5 text-white">
                                    Posiadasz już u nas konto?
                                </h5>
                                <p className="card-text fs-5 text-white">
                                    Zaloguj się, aby rozpocząć grę
                                </p>
                                <Link to="/login" className="btn btn-light mx-2">
                                    Zaloguj się
                                </Link>
                            </div>
                        </div>
                        <div className="card custom-bg-primary m-5">
                            <div className="card-body">
                                <p className="card-title fs-5 text-white">
                                    Nie posiadasz jeszcze konta?
                                </p>
                                <p className="card-text fs-5 text-white">
                                    Zarejestruj się, aby zdobyć&nbsp;
                                    <span className="text-warning fw-bold">
                                        1000 bonusowych Euro Jamników na start!
                                    </span>
                                </p>
                                <Link to="/register" className="btn btn-warning mx-2">
                                    Zarejestruj się
                                </Link>
                            </div>
                        </div>
                        <div className="card custom-bg-primary m-5">
                            <div className="card-body">
                                <h5 className="card-title fs-5 text-white">
                                    Nie wiesz na czym polega gra?
                                </h5>
                                <p className="card-text fs-5 text-white">
                                    Wypróbuj wersję demo!
                                </p>
                                <Link to="/game/demo" className="btn btn-dark mx-2">
                                    Zagraj w demo
                                </Link>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default HomeView