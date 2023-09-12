import '../styles/fruit-machine.scss'
import React from 'react'
import AbstractLotteryComponent from './AbstractLotteryComponent'
import { SET_USER_ACCOUNT_BALANCE, UPDATE_USER_ACCOUNT_BALANCE } from '../types/authTypes'
import GameMultiplier from './GameMultiplier'
import AccountBalance from './AccountBalance'
import TopUpAccountButton from './TopUpAccountButton'
import Loader from './Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAppleWhole, faCarrot, faCoffee, faLeaf, faLemon, faPepperHot} from '@fortawesome/free-solid-svg-icons'


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
                    index: 0,
                    type: 'normal',
                    cols: [
                        {
                            'icon': faLemon,
                        },
                        {
                            'icon': faAppleWhole,
                        },
                        {
                            'icon': faLeaf,
                        },
                        {
                            'icon': faCarrot,
                        },
                        {
                            'icon': faPepperHot,
                        },
                    ]
                },
                {
                    index: 1,
                    type: 'normal',
                    cols: [
                        {
                            'icon': faLemon,
                        },
                        {
                            'icon': faCarrot,
                        },
                        {
                            'icon': faPepperHot,
                        },
                        {
                            'icon': faAppleWhole,
                        },
                        {
                            'icon': faLeaf,
                        },
                    ]
                },
                {
                    index: 2,
                    type: 'result',
                    cols: [
                        {
                            'icon': faLemon,
                        },
                        {
                            'icon': faCarrot,
                        },
                        {
                            'icon': faAppleWhole,
                        },
                        {
                            'icon': faLeaf,
                        },
                        {
                            'icon': faPepperHot,
                        },
                    ]
                },
                {
                    index: 3,
                    type: 'normal',
                    cols: [
                        {
                            'icon': faPepperHot,
                        },
                        {
                            'icon': faLemon,
                        },
                        {
                            'icon': faCarrot,
                        },
                        {
                            'icon': faAppleWhole,
                        },
                        {
                            'icon': faLeaf,
                        },
                    ]
                },
                {
                    index: 4,
                    type: 'normal',
                    cols: [
                        {
                            'icon': faLemon,
                        },
                        {
                            'icon': faCarrot,
                        },
                        {
                            'icon': faAppleWhole,
                        },
                        {
                            'icon': faPepperHot,
                        },
                        {
                            'icon': faLeaf,
                        },
                    ]
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

    setError = (errorMessage = null) => {
        if (!errorMessage) {
            errorMessage = 'Wystąpił niezidentyfikowany błąd. Prosimy o kontakt.'
        }

        this.resetResult()
        this.setState({
            errorMessage
        })
    }

    getFruitMachineCols = (line) => {
        const {
            numberOfLines,
        } = this.state
        const cols = []

        for (let colNumber = 0; colNumber < numberOfLines; colNumber++) {  // cols
            const colElement = line.cols[colNumber]

            cols.push(
                <div
                    key={colNumber}
                    className={`fruit-machine--line--element`}
                >
                    <FontAwesomeIcon icon={colElement.icon} className="fa-5x" />
                </div>
            );
        }

        return cols
    }

    getFruitMachineGrid = () => {
        const { lines, numberOfLines, isLotteryRunning } = this.state
        const rows = []

        for (let rowNumber = 0; rowNumber < numberOfLines; rowNumber++) {
            const line = lines[rowNumber]
            const opacity = 1
            const isShowing = rowNumber < numberOfLines / rowNumber
            const isHiding = rowNumber > numberOfLines / rowNumber
            let slideClass = ''

            if (isLotteryRunning && isShowing) {
                slideClass = 'slide--show'
            } else if (isLotteryRunning && isHiding) {
                slideClass = 'slide--hide'
            }

            const cols = this.getFruitMachineCols(line)

            rows.push(
                <div
                    key={`${line.type}-${line.index}`}
                    className={`fruit-machine--line ${line.type} ${slideClass}`}
                    style={{ opacity }}
                    data-line-type={line.type}
                >
                    {cols}
                </div>
            )
        }

        return rows
    }

    spin = async (currentSpinCount = 0, targetSpinCount = 100) => {
        const newLines = [...this.state.lines]
        const prependedElement = newLines.pop()

        newLines.unshift(prependedElement)

        this.setState({
            lines: newLines
        })

        await new Promise((resolve) => {
            setTimeout(() => {
                if (currentSpinCount < targetSpinCount) {
                    this.spin(++currentSpinCount).then(resolve)
                } else {
                    resolve()
                }
            }, 125)
        })
    }

    runLottery = async () => {
        if (!this.hasRequiredAccountBalance()) {
            return false
        }

        this.resetResult()
        this.setState({
            isLotteryRunning: true
        })

        await this.spin()

        this.setState({
            isLotteryRunning: false,
        })
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
