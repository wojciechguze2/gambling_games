import { useSelector } from 'react-redux'

const MainHeader = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <header className={"main-header"}>
            <nav className="navbar navbar-inverse navbar-expand-lg navbar-light custom-bg-primary">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
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
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav navbar-nav">
                            {user ? (
                                <>
                                    <li className="dropdown">
                                        <button
                                            className="btn btn-info custom-bg-info rounded-0 dropdown-toggle"
                                            id="games-dropdown"
                                            type="button"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Zagraj
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="games-dropdown">
                                            <li>
                                                <a className="dropdown-item" href="/game/wheel-of-fortune">
                                                    Koło fortuny
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <a href="/game/demo" className="btn btn-info custom-bg-info rounded-0">
                                            Koło fortuny - demo
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
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
                </div>
            </nav>
        </header>
    );
}

export default MainHeader