import '../styles/number-lottery.scss'
import React from 'react'
import AbstractLotteryComponent from './AbstractLotteryComponent'
import NumberLotteryPicker from './NumberLotteryPicker'
import { SET_USER_ACCOUNT_BALANCE, UPDATE_USER_ACCOUNT_BALANCE } from '../types/authTypes'
import GameMultiplier from './GameMultiplier'
import AccountBalance from './AccountBalance'
import TopUpAccountButton from './TopUpAccountButton'


class FruitMachine extends AbstractLotteryComponent {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            gameMultiplierValue: props.initialMultiplier || 1,
            userAccountBalance: props.user ? props.user.accountBalance : null,
            isDemo: props.isDemo || !props.user,
            gameCode: props.gameCode,
            ...super.state,
            isLotteryRunning: false,
        };
    }

    async componentDidMount() {
        await this.lotteryComponentDidMount()
    }

    isRunLotteryAvailable = () => {
        return (
            !this.state.isLotteryRunning
            && this.hasRequiredAccountBalance()
        )
    }

    setError = (errorMessage = null) => {
        if (!errorMessage) {
            errorMessage = 'Wystąpił niezidentyfikowany błąd. Prosimy o kontakt.'
        }

        this.resetResult()
        this.setState({
            errorMessage
        })
    }

    runLottery = async () => {
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default FruitMachine
