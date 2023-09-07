import React from 'react'
import '../styles/number-lottery.scss'
import AbstractLotteryComponent from './AbstractLotteryComponent'
import NumberLotteryPicker from './NumberLotteryPicker'


class NumberLottery extends AbstractLotteryComponent {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            gameMultiplierValue: props.initialMultiplier || 1,
            userAccountBalance: props.user ? props.user.accountBalance : null,
            isDemo: props.isDemo || !props.user,
            gameCode: props.gameCode,
            ...super.state,
            numbersCount: props.initialNumbersCount || 6
        };
    }

    async componentDidMount() {
        await this.lotteryComponentDidMount()
    }

    setError = (errorMessage = null) => {
        if (!errorMessage) {
            errorMessage = 'Wystąpił niezidentyfikowany błąd. Prosimy o kontakt.'
        }

        this.resetResult()
        this.setState({
        })
    }

    render() {
        return (
            <div>
                <NumberLotteryPicker />
            </div>
        )
    }
}

export default NumberLottery
