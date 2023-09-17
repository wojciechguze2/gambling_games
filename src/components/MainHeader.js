import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { SET_GAMES } from '../types/gameTypes'
import Loader from './Loader'
import { getAllGames } from '../service/game'
import MainHeaderCollapse from './MainHeaderCollapse'
import { MOBILE_MAX_WIDTH_PX } from '../utils/constants'

const MainHeader = () => {
    const user = useSelector(state => state.auth.user)
    const gamesData = useSelector(state => state.games)
    const [isLoading, setLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            if (!gamesData || !gamesData.games) {
                const games = await getAllGames()
                dispatch({ type: SET_GAMES, payload: games })
            }
        }

        fetchData().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
        {
            isLoading ? <Loader /> : (
                <header className={"main-header"}>
                    <nav className="navbar navbar-inverse navbar-expand-lg navbar-light custom-bg-primary">
                        <div className="container">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="navbar-header">
                                <a href="/" className="navbar-brand text-white fw-bold">
                                    EuroDachshund
                                </a>
                            </div>
                            {!isMobile && (
                                <MainHeaderCollapse
                                    user={user}
                                    gamesData={gamesData}
                                    isMobile={isMobile}
                                />
                            )}
                            <ul className="nav navbar-nav navbar-right">
                                {user ? (
                                    <>
                                        <li>
                                            <a href="/account" className="btn btn-light rounded-0">
                                                Moje konto
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/logout" className="btn btn-dark rounded-0">
                                                Wyloguj się
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <a href="/login" className="btn btn-light rounded-0">
                                                Zaloguj się
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/register" className="btn btn-warning rounded-0">
                                                Zarejestruj się
                                            </a>
                                        </li>
                                    </>
                                ) }
                            </ul>
                            {isMobile && (
                                <MainHeaderCollapse
                                    user={user}
                                    gamesData={gamesData}
                                    isMobile={isMobile}
                                />
                            )}
                        </div>
                    </nav>
                </header>
            )
        }
        </>
    );
}

export default MainHeader