import LotteryGameWheelOfFortune from '../components/LotteryGameWheelOfFortune'
import { useDispatch, useSelector } from 'react-redux'
import MetaTags from '../components/MetaTags'

const GameWheelOfFortuneView = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <>
            <MetaTags
                title="Koło fortuny - euro-jamniki.pl"
                description="Zakręć kołem fortuny i zgarnij Euro Jamniki!"
            />
            <div className="game game--wheel-of-fortune-container container text-center">
                <LotteryGameWheelOfFortune
                    gameCode={'wheel-of-fortune'}
                    containerClass={'m-auto d-inline-flex bg-dark my-5'}
                    contentClass={'custom-bg-primary shadow-lg fw-bold border border-light border-2'}
                    jackpotChoiceClass={'text-danger'}
                    winChoiceClass={'text-warning blink-text fw-bolder'}
                    winIndicatorClass={'active'}
                    playButtonLabel={'Zagraj'}
                    isDemo={false}
                    user={user}
                    dispatch={dispatch}
                    initialMultiplier={1}
                />
            </div>
        </>
    )
}

export default GameWheelOfFortuneView
