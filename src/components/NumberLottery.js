import React from 'react'
import '../styles/number-lottery.scss'
import AbstractLotteryComponent from './AbstractLotteryComponent'
import NumberLotteryPicker from './NumberLotteryPicker'
import { UPDATE_USER_ACCOUNT_BALANCE } from '../types/authTypes'


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
            availableNumbersCount: 50,
            requiredSelectedNumbersCount: props.requiredSelectedNumbersCount || 6,
            selectedNumbers: [],
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
            && this.state.requiredSelectedNumbersCount === this.state.selectedNumbers.length
        )
    }

    selectNumber = (number) => {
        const {
            selectedNumbers
        } = this.state

        this.setState({ selectedNumbers: [...selectedNumbers, number] })
    }

    unSelectNumber = (number) => {
        const {
            selectedNumbers
        } = this.state

        this.setState({ selectedNumbers: selectedNumbers.filter((n) => n !== number) })
    }

    handleNumberClick = (number) => {
        const {
            isLotteryRunning,
            requiredSelectedNumbersCount,
            selectedNumbers
        } = this.state

        if (isLotteryRunning) {
            return
        }

        const isNumberSelected = selectedNumbers.includes(number)

        if (isNumberSelected) {
            this.unSelectNumber(number)
        } else if (selectedNumbers.length < requiredSelectedNumbersCount) {
            this.selectNumber(number)
        } else { // selectedNumbers.length >= requiredSelectedNumbersCount
            // requiredSelectedNumbersCount has been achieved
        }
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
        if (!this.hasRequiredAccountBalance()) {
            return false
        }

        this.resetResult()
        this.setState({
            isLotteryRunning: true,
        })

        if (this.state.user) {
            const { costValue, gameMultiplierValue } = this.state

            this.props.dispatch({ type: UPDATE_USER_ACCOUNT_BALANCE, payload: -(costValue * gameMultiplierValue) })
        }


    }

    render() {
        const {
            availableNumbersCount,
            isLotteryRunning,
            requiredSelectedNumbersCount,
            selectedNumbers,
            currencyName  // todo: change to resultCurrencyName
        } = this.state

        return (
            <div>
                Wybierz {requiredSelectedNumbersCount} liczb aby rozpocząć losowanie.
                <NumberLotteryPicker
                    availableNumbersCount={availableNumbersCount}
                    isLotteryRunning={isLotteryRunning}
                    selectedNumbers={selectedNumbers}
                    handleNumberClick={this.handleNumberClick}
                    resultNumbers={isLotteryRunning ? [{'number': 1, 'value': 100}, {'number': 2, 'value': 100}, {'number': 3, 'value': 100000}, {'number': 4, 'value': 10000}, {'number': 5, 'value': 100}, {'number': 6, 'value': 1000}] : []}
                    resultCurrencyName={currencyName}
                />
                <button
                    className={`btn btn-warning play-button btn-lg text-dark fw-bold my-2 float-end`}
                    onClick={this.runLottery}
                    disabled={!this.isRunLotteryAvailable()}
                >
                    Losuj
                </button>
            </div>
        )
    }
}

export default NumberLottery
