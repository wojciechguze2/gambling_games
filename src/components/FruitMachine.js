import '../styles/fruit-machine.scss'
import React from 'react'
import AbstractLotteryComponent from './AbstractLotteryComponent'
import { SET_USER_ACCOUNT_BALANCE, UPDATE_USER_ACCOUNT_BALANCE } from '../types/authTypes'
import GameMultiplier from './GameMultiplier'
import AccountBalance from './AccountBalance'
import TopUpAccountButton from './TopUpAccountButton'
import Loader from './Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


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
            numberOfLines: props.numberOfLines ? props.numberOfLines : 5,
            lines: [
                {
                    type: 'normal',
                    visible: true,
                },
                {
                    type: 'normal',
                    visible: true,
                },
                {
                    type: 'result',
                    visible: true,
                },
                {
                    type: 'normal',
                    visible: true,
                },
                {
                    type: 'normal',
                    visible: true,
                },
            ]
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

    getFruitMachineCols = (line) => {
        const {
            numberOfLines,
        } = this.state
        const cols = []

        for (let colNumber = 0; colNumber < numberOfLines; colNumber++) {  // cols
            cols.push(
                <div
                    key={colNumber}
                    className={`fruit-machine--line--element`}
                >
                    <FontAwesomeIcon icon={faCoffee} className="fa-5x" />
                </div>
            );
        }

        return cols
    }

    getFruitMachineGrid = () => {
        const {
            lines,
            numberOfLines
        } = this.state
        const visibleLinesLength = lines.length
        const rows = []

        for (let rowNumber = 0; rowNumber < lines.length; rowNumber++) {  // rows
            const line = lines[rowNumber]
            const opacity = 1 - Math.abs(rowNumber - (lines.length - 1) / 2) / (visibleLinesLength / 2)
            const translateVar = (
                line.visible ? 0 : '100%'
            )
            const cols = this.getFruitMachineCols(line)

            rows.push(
                <div
                    key={rowNumber}
                    className={`fruit-machine--line ${line.type}`}
                    style={{ opacity, transform: `translateY(${translateVar})` }}
                >
                    {cols}
                </div>
            );
        }


        return rows
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

        const lines = this.state.lines
        const prependedElement = lines.pop()
        const appendedElement = prependedElement
        appendedElement.visible = false

        this.setState({
            isLotteryRunning: true,
            lines: [prependedElement, ...lines, appendedElement],
        })

        setTimeout(() => {
            this.setState({ isLotteryRunning: false })
        }, 500)
    }

    render() {
        const {
            currencyName,
            isLoading,
            isLotteryRunning,
            isDemo,
            isWin,
            errorMessage,
            winMessage,
            costMessage,
            costValue,
            gameMultiplierValue
        } = this.state

        const costLabel = ' za ' + costValue * gameMultiplierValue + ' ' + currencyName
        const jackpotValue = this.getJackpotValue()

        return (
            <div>
                {isLoading ? <Loader/> : (
                    <>
                        <div className="lottery-title"> {/* todo: move lottery title to new component if possible */}
                            {isLotteryRunning ? (
                                isWin === null ? (
                                    <h5>Rozpoczęto losowanie!</h5>
                                ) : (
                                    <h5>Losowanie zakończone!</h5>
                                )
                            ) : (
                                <h5>Jednoręki bandyta</h5>
                            )}
                            {jackpotValue && (
                                <h6>
                                    Maksymalna wygrana: <span className="text-danger">{jackpotValue} {currencyName}</span>
                                </h6>
                            )}
                        </div>
                        <div className="fruit-machine">
                            {this.getFruitMachineGrid()}
                        </div>
                        <div className="fruit-machine-alerts alerts"> {/* todo: move alerts to new component */}
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
                        <div className="fruit-machine-buttons mt-3 mb-5">{/* todo: move buttons to new component if possible */}
                            <button
                                className={`btn btn-warning play-button btn-lg text-dark fw-bold my-2`}
                                onClick={this.runLottery}
                                disabled={!this.isRunLotteryAvailable()}
                            >
                                Losuj {costLabel}
                            </button>
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
                    </>
                )}
            </div>
        )
    }
}

export default FruitMachine
