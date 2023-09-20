import LotteryGameFruitMachine from '../components/LotteryGameFruitMachine'
import { useDispatch, useSelector } from 'react-redux'
import MetaTags from '../components/MetaTags'

const GameNumberLotteryView = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <>
            <MetaTags
                title="Jednoręki bandyta - euro-jamniki.pl"
                description="Wypróbuj swoje szczęście w jednorękim bandycie. Graj i zgarniaj Euro Jamniki!"
            />
            <div className="game game--fruit-machine-container container text-center my-5">
                <LotteryGameFruitMachine
                    gameCode={'fruit-machine'}
                    isDemo={false}
                    user={user}
                    dispatch={dispatch}
                    initialMultiplier={1}
                    numberOfLines={5}
                />
            </div>
        </>
    )
}

export default GameNumberLotteryView
