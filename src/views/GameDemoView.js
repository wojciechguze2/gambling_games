import WheelOfFortune from '../components/WheelOfFortune'
import { useSelector } from 'react-redux'

const GameDemoView = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <div className="game-demo container text-center">
            <WheelOfFortune
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
    )
}

export default GameDemoView
