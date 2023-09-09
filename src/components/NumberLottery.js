import '../styles/number-lottery.scss'
import React from 'react'
import AbstractLotteryComponent from './AbstractLotteryComponent'
import NumberLotteryPicker from './NumberLotteryPicker'
import { SET_USER_ACCOUNT_BALANCE, UPDATE_USER_ACCOUNT_BALANCE } from '../types/authTypes'
import GameMultiplier from './GameMultiplier'
import AccountBalance from './AccountBalance'
import TopUpAccountButton from './TopUpAccountButton'


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
            resultNumbers: []
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

        this.setState({ selectedNumbers: [number, ...selectedNumbers] })  // prepend
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
            // do nothing - requiredSelectedNumbersCount has been achieved
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

    isSelectedNumber = (number) => {
        return this.state.selectedNumbers.includes(number)
    }

    isNumberAlreadyAdded = (resultNumbers, number) => {
        return resultNumbers.some(resultNumber => resultNumber.number === number)
    }

    getTotalValue = (resultNumbers) => {
        return resultNumbers.reduce((total, result) => total + result.value, 0)
    }

    getRandomResultNumbersCount = () => {
        return Math.floor(Math.random() * this.state.requiredSelectedNumbersCount) + 1
    }

    getRandomSelectedNumber = (resultNumbers) => {
        const randomSelectedNumber = this.state.selectedNumbers[Math.floor(Math.random() * this.state.selectedNumbers.length)]

        if (
            !this.isSelectedNumber(randomSelectedNumber)
            || this.isNumberAlreadyAdded(resultNumbers, randomSelectedNumber)
        ) {
            return this.getRandomSelectedNumber(resultNumbers)
        }

        return randomSelectedNumber
    }

    getRandomNotSelectedNumber = (resultNumbers) => {
        const randomNotSelectedNumber = Math.floor(Math.random() * this.state.availableNumbersCount) + 1

        if (
            this.isSelectedNumber(randomNotSelectedNumber)
            || this.isNumberAlreadyAdded(resultNumbers, randomNotSelectedNumber)
        ) {
            return this.getRandomNotSelectedNumber(resultNumbers)
        }

        return randomNotSelectedNumber
    }

    generateResultNumbers = (resultValue, resultNumbersCount = null) => {
        const {
            requiredSelectedNumbersCount,
        } = this.state

        if (!resultNumbersCount) {
            resultNumbersCount = this.getRandomResultNumbersCount()
        }

        const resultNumbers = []

        while (resultNumbers.length < resultNumbersCount) {
            if (resultNumbers.length === resultNumbersCount - 1) {  // last loop index
                const missingValue = resultValue - this.getTotalValue(resultNumbers)

                if (!missingValue) {
                    break
                }

                const randomSelectedNumber = this.getRandomSelectedNumber(resultNumbers)

                resultNumbers.push({
                    number: randomSelectedNumber,
                    value: missingValue
                })

                break
            }

            const currentValue = this.getTotalValue(resultNumbers)

            if (currentValue === resultValue) {
                break
            }

            const randomSelectedNumber = this.getRandomSelectedNumber(resultNumbers)

            const value = Math.floor(Math.random() * (resultValue - currentValue)) + 1

            resultNumbers.push({
                number: randomSelectedNumber,
                value
            })
        }

        const totalValue = this.getTotalValue(resultNumbers)

        if (totalValue !== resultValue) {  // potentially unnecessary
            return this.generateResultNumbers(resultValue, resultNumbersCount)
        }

        while (resultNumbers.length < requiredSelectedNumbersCount) {
            const randomNotSelectedNumber = this.getRandomNotSelectedNumber(resultNumbers)
            const value = Math.floor(Math.random() * resultValue) + 1

            resultNumbers.push({
                number: randomNotSelectedNumber,
                value
            })
        }

        return resultNumbers
    }

    runAgainLottery = async () => {
        this.resetResult()
        this.setState({
            selectedNumbers: [],
            isLotteryRunning: false,
            resultNumbers: []
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

        const data = await this.getRandomGameResult()

        if (!data) {
            return null
        }

        if (!data.result) {
            this.setError()

            return null
        }

        const {
            result,
            isWin,
            currencyName,
            userAccountBalance
        } = data

        const resultNumbers = this.generateResultNumbers(result.value)

        const costMessage = (
            'Zapłacono: ' + this.state.costValue * this.state.gameMultiplierValue + ' ' + this.state.currencyName
        )
        const winMessage = (
            'Wylosowano: ' + result.value * this.state.gameMultiplierValue + ' ' + currencyName
        )

        setTimeout(() => {
            this.setState({
                resultNumbers,
                resultCurrencyName: currencyName,
                result,
            })

            setTimeout(() => {
                this.setState({
                    userAccountBalance,
                    costMessage,
                    winMessage,
                    isWin,
                })

                if (this.state.user) {
                    this.props.dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: userAccountBalance})
                }
            }, 1000)
        }, 1000)
    }

    render() {
        const {
            availableNumbersCount,
            isLotteryRunning,
            currencyName,
            requiredSelectedNumbersCount,
            isDemo,
            isWin,
            selectedNumbers,
            resultNumbers,
            resultCurrencyName,
            errorMessage,
            costMessage,
            winMessage,
            costValue,
            gameMultiplierValue
        } = this.state

        const costLabel = ' za ' + costValue * gameMultiplierValue + ' ' + currencyName
        const jackpotValue = this.getJackpotValue()

        return (
            <div>
                {isLotteryRunning ? (
                    isWin === null ? (
                        <h5>Rozpoczęto losowanie!</h5>
                    ) : (
                        <h5>Losowanie zakończone!</h5>
                    )
                ) : (
                    <h5>Wybierz {requiredSelectedNumbersCount} liczb aby rozpocząć losowanie.</h5>
                )}
                {jackpotValue && (
                    <h6>
                        Maksymalna wygrana: <span className="text-danger">{jackpotValue} {currencyName}</span>
                    </h6>
                )}
                <NumberLotteryPicker
                    availableNumbersCount={availableNumbersCount}
                    isLotteryRunning={isLotteryRunning}
                    selectedNumbers={selectedNumbers}
                    handleNumberClick={this.handleNumberClick}
                    resultNumbers={resultNumbers}
                    resultCurrencyName={resultCurrencyName}
                    gameMultiplierValue={gameMultiplierValue}
                />
                <div className="number-lottery-alerts">
                    {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )}
                    {costMessage && !isDemo && (
                        <div className="alert alert-warning">
                            {costMessage}
                        </div>
                    )}
                    {winMessage && !isDemo && (
                        <div className={`alert alert-${isWin === false ? 'danger' : 'success'}`}>
                            {winMessage}
                        </div>
                    )}
                </div>
                <div className="number-lottery-buttons mt-3 mb-5">
                    {isLotteryRunning && resultNumbers && isWin !== null ? (
                        <button
                            className={`btn btn-warning play-button btn-lg text-dark fw-bold my-2`}
                            onClick={this.runAgainLottery}
                        >
                            Rozpocznij nową grę
                        </button>
                    ) : (
                        <button
                            className={`btn btn-warning play-button btn-lg text-dark fw-bold my-2`}
                            onClick={this.runLottery}
                            disabled={!this.isRunLotteryAvailable()}
                        >
                            Losuj {costLabel}
                        </button>
                    )}
                    {!isDemo && (
                        <GameMultiplier
                            disabled={isLotteryRunning}
                            handleGameMultiplierChange={this.changeGameMultiplier}
                            currentMultiplier={gameMultiplierValue}
                            availableMultipliers={[0.5, 1, 2, 5]}
                        />
                    )}
                    {!isDemo && (
                        <AccountBalance />
                    )}
                    {!this.hasRequiredAccountBalance() && (
                        <TopUpAccountButton
                            handleTopUpChange={this.handleTopUpChange}
                            disabled={isLotteryRunning && isWin === null}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default NumberLottery
