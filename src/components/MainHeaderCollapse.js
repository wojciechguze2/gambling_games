const MainHeaderCollapse = ({ user, gamesData, isMobile }) => {
    return (
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav navbar-nav">
                {user ? (
                    <>
                        {isMobile ? (
                            <ul className="list-style-inside">
                                {gamesData && gamesData.games && gamesData.games.length && gamesData.games.map(game => (
                                    <li key={game.id} className="p-2">
                                        <a href={`/game/${game.code}`} className="text-white text-decoration-none fw-bold">
                                            {game.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
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
                                        {gamesData && gamesData.games && gamesData.games.length && gamesData.games.map(game => (
                                            <li key={game.id}>
                                                <a className="dropdown-item" href={`/game/${game.code}`}>
                                                    {game.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        }
                    </>
                ) : (
                    <li>
                        <a href="/game/demo" className="btn btn-info custom-bg-info rounded-0">
                            Koło fortuny - demo
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default MainHeaderCollapse