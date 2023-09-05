import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeView = () => {
    const user = useSelector(state => state.auth.user)

    const latestGames = [
        {
            title: 'Koło fortuny',
            url: '/game/wheel-of-fortune',
            description: 'Warto spróbować swojego szczęścia w najnowszej grze "Koło fortuny"! Za zaledwie 20 EuroJamników masz szansę wygrać aż 90 000 EuroJamników. Kręć kołem i zgarniaj doskonałe nagrody!',
            imageUrl: '/images/homepage/latest-games--wheel-of-fortune.webp',
        },
        {
            title: 'Koło fortuny',
            url: '/game/wheel-of-fortune',
            description: 'Warto spróbować swojego szczęścia w najnowszej grze "Koło fortuny"! Za zaledwie 20 EuroJamników masz szansę wygrać aż 90 000 EuroJamników. Kręć kołem i zgarniaj doskonałe nagrody!',
            imageUrl: '/images/homepage/latest-games--wheel-of-fortune.webp',
        },
        {
            title: 'Koło fortuny',
            url: '/game/wheel-of-fortune',
            description: 'Warto spróbować swojego szczęścia w najnowszej grze "Koło fortuny"! Za zaledwie 20 EuroJamników masz szansę wygrać aż 90 000 EuroJamników. Kręć kołem i zgarniaj doskonałe nagrody!',
            imageUrl: '/images/homepage/latest-games--wheel-of-fortune.webp',
        },
    ];

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
                        <div className="card custom-bg-primary m-5">
                            <div className="card-header">
                                <h5 className="card-title">Najnowsze Gry</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {latestGames.map((latestGame, index) => (
                                        <div key={index} className="col-md-4 mb-4">
                                            <div className="card">
                                                <img
                                                    src={latestGame.imageUrl}
                                                    className="card-img-top"
                                                    alt={latestGame.title}
                                                />
                                                <div className="card-body custom-bg-info">
                                                    <h5 className="card-title">
                                                        {latestGame.title}
                                                    </h5>
                                                    <p className="card-text">
                                                        {latestGame.description}
                                                    </p>
                                                    <Link to={latestGame.url} className="btn custom-bg-primary border-0 btn-info">
                                                        Zagraj
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                <h5 className="card-title fs-5 text-white">
                                    Nie posiadasz jeszcze konta?
                                </h5>
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