import React from 'react'
import '../styles/wheel-of-fortune.scss'
import {
    SET_USER_ACCOUNT_BALANCE,
    UPDATE_USER_ACCOUNT_BALANCE
} from '../types/authTypes'
import AccountBalance from './AccountBalance'
import TopUpAccountButton from './TopUpAccountButton'
import GameMultiplier from './GameMultiplier'
import Loader from './Loader'
import AbstractLotteryComponent from './AbstractLotteryComponent'


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
        };
    }

    async componentDidMount() {
        await this.lotteryComponentDidMount()

        document.documentElement.style.setProperty('--startAngle', `${this.state.startAngle}deg`);
        document.documentElement.style.setProperty('--finalAngle', `${this.state.finalAngle}deg`);
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
    }
}

export default NumberLottery;
