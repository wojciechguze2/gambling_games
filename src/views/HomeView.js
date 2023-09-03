import WheelOfFortune from '../components/WheelOfFortune'

const HomeView = () => {
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
                    <WheelOfFortune
                        colorClass={'bg-primary'}
                    />
                    <div className="mt-auto mb-5">
                        <button className="btn btn-warning btn-lg w-50">
                            Zagraj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomeView