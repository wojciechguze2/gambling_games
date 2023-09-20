import LotteryGameWheelOfFortune from '../components/LotteryGameWheelOfFortune'
import { useSelector } from 'react-redux'
import MetaTags from "../components/MetaTags";

const GameDemoView = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <>
            <MetaTags
                title="Gra demo - euro-jamniki.pl"
                description="Zagraj w wersję DEMO koła fortuny"
            />
            <div className="game-demo container text-center">
                <LotteryGameWheelOfFortune
                    gameCode={'wheel-of-fortune'}
                    containerClass={'m-auto d-inline-flex bg-dark my-5'}
                    contentClass={'custom-bg-primary shadow-lg fw-bold border border-light border-2'}
                    jackpotChoiceClass={'text-danger'}
                    winChoiceClass={'text-warning blink-text fw-bolder'}
                    winIndicatorClass={'active'}
                    playButtonLabel={'Zagraj w demo'}
                    isDemo={true}
                    user={user}
                />
            </div>
        </>
    )
}

export default GameDemoView
