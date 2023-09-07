import NumberLottery from '../components/NumberLottery'
import { useDispatch, useSelector } from 'react-redux'

const GameNumberLotteryView = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <div className="game game--number-lottery-container container text-center my-5">
            <NumberLottery
                gameCode={'number-lottery'}
                playButtonLabel={''}
                isDemo={false}
                user={user}
                dispatch={dispatch}
                initialMultiplier={1}
                initialNumbersCount={6}
            />
        </div>
    )
}

export default GameNumberLotteryView
