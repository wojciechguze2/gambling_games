import WheelOfFortune from "../components/WheelOfFortune"

const GameDemoView = () => {
    return (
        <div className="game-demo container text-center">
            <WheelOfFortune
                containerClass={'m-auto d-inline-flex bg-dark my-5'}
                contentClass={'custom-bg-primary shadow-lg fs-6 fw-bold border border-light border-2'}
                winChoiceClass={'text-warning blink-text fw-bolder'}
                winIndicatorClass={'active'}
                playButtonLabel={'Zagraj w DEMO'}
                isDemo={true}
            />
        </div>
    )
}

export default GameDemoView
