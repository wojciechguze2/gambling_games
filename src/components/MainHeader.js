const MainHeader = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light custom-bg-primary">
                <div className="container">
                    <a className="navbar-brand text-white" href="/">
                        Gambling games (demo)
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto text-white-50">
                            {/* todo: add games */}
                            <li className="nav-item">
                                <a className="nav-link" href="/game/random">
                                    Losowa gra
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default MainHeader