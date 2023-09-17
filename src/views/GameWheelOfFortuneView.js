import LotteryGameWheelOfFortune from '../components/LotteryGameWheelOfFortune'
import {useDispatch, useSelector} from 'react-redux'

const GameWheelOfFortuneView = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
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
    )
}

export default GameWheelOfFortuneView
