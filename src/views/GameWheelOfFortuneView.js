import WheelOfFortune from '../components/WheelOfFortune'
import {useDispatch, useSelector} from 'react-redux'

const GameWheelOfFortuneView = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <div className="game game--wheel-of-fortune-container container text-center">
            <WheelOfFortune
                containerClass={'m-auto d-inline-flex bg-dark my-5'}
                contentClass={'custom-bg-primary shadow-lg fs-6 fw-bold border border-light border-2'}
                winChoiceClass={'text-warning blink-text fw-bolder'}
                winIndicatorClass={'active'}
                playButtonLabel={'Zagraj'}
                isDemo={false}
                user={user}
                dispatch={dispatch}
            />
        </div>
    )
}

export default GameWheelOfFortuneView
