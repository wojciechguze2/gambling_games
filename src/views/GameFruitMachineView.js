import FruitMachine from '../components/FruitMachine'
import { useDispatch, useSelector } from 'react-redux'

const GameNumberLotteryView = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <div className="game game--fruit-machine-container container text-center my-5">
            <FruitMachine
                gameCode={'fruit-machine'}
                isDemo={false}
                user={user}
                dispatch={dispatch}
                initialMultiplier={1}
                numberOfLines={5}
            />
        </div>
    )
}

export default GameNumberLotteryView