import LotteryGameNumberLottery from '../components/LotteryGameNumberLottery'
import { useDispatch, useSelector } from 'react-redux'
import MetaTags from '../components/MetaTags'

const GameNumberLotteryView = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <>
            <MetaTags
                title="Loteria liczbowa - euro-jamniki.pl"
                description="Wytypuj swoje liczby i zgarnij Euro Jamniki!"
            />
            <div className="game game--number-lottery-container container text-center my-5">
                <LotteryGameNumberLottery
                    gameCode={'number-lottery'}
                    isDemo={false}
                    user={user}
                    dispatch={dispatch}
                    initialMultiplier={1}
                    requiredSelectedNumbersCount={6}
                />
            </div>
        </>
    )
}

export default GameNumberLotteryView
