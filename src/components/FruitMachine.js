import '../styles/fruit-machine.scss'
import React from 'react'
import AbstractLotteryComponent from './AbstractLotteryComponent'
import { SET_USER_ACCOUNT_BALANCE, UPDATE_USER_ACCOUNT_BALANCE } from '../types/authTypes'
import GameMultiplier from './GameMultiplier'
import AccountBalance from './AccountBalance'
import TopUpAccountButton from './TopUpAccountButton'
import Loader from './Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  // not enough free fruit icons :(
    faAppleWhole,
    faCarrot,
    faCoffee,
    faLeaf,
    faLemon,
    faPepperHot,
    faHeart,
    faBomb,
    faBolt,
    faBug,  // (:
} from '@fortawesome/free-solid-svg-icons'

const AVAILABLE_ICONS = {
    'appleWhole': faAppleWhole,
    'carrot': faCarrot,
    'coffee': faCoffee,
    'leaf': faLeaf,
    'lemon': faLemon,
    'pepperHot': faPepperHot,
    'heart': faHeart,
    'bomb': faBomb,
    'bolt': faBolt,
    'bug': faBug
}

const AVAILABLE_ICON_NAMES = Object.keys(AVAILABLE_ICONS)

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
            slideAnimationTimeMs: 2000,
            minWinningSameCols: 3,
            isLotteryRunning: false,
            numberOfLines: props.numberOfLines ? props.numberOfLines : 5,
            lines: [],
        };
    }

    async componentDidMount() {
        await this.lotteryComponentDidMount()
        await this.setRandomLines()
        await this.generateFruitMachineWinningCombinations()
        this.setSlideAnimationVariable()
    }

    isRunLotteryAvailable = () => {
        return (
            !this.state.isLotteryRunning
            && this.hasRequiredAccountBalance()
        )
    }
    
    getRandomColIcons = async (numberOfLines, isWin = false) => {
       const randomIcons = []
       const colIconNames = this.generateFruitMachineLineColIconNames(numberOfLines, false)

        for (let colNumber = 0; colNumber < numberOfLines; colNumber++) {
            randomIcons.push({
                icon: AVAILABLE_ICONS[colIconNames[colNumber].iconName]
            })
        }

        return randomIcons
    }

    getColIconName = (previousIconName = null, isWin = false) => {
        if (isWin && previousIconName) {
            return previousIconName
        }

        let availableIcons

        if (previousIconName) {
            availableIcons = AVAILABLE_ICON_NAMES.filter(iconName => iconName !== previousIconName)
        } else {
            availableIcons = AVAILABLE_ICON_NAMES
        }

        return (
            isWin && previousIconName ? previousIconName : (
                availableIcons[Math.floor(Math.random() * availableIcons.length)]
            )
        )
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

    setRandomLines = async () => {
        const {
            numberOfLines
        } = this.state

        const lines = []

        for (let rowNumber = 0; rowNumber < numberOfLines; rowNumber++) {
            const line = {
                index: rowNumber,
                cols:  await this.getRandomColIcons(numberOfLines, false)
            }

            lines.push(line)
        }

        this.setState({ lines })

        return lines
    }

    setSlideAnimationVariable = () => {
        document.documentElement.style.setProperty(
            '--slideAnimationTime',
            `${this.state.slideAnimationTimeMs / 1000}s`
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

    generateFruitMachineWinningCombinations = () => {
        const {
            gameValuesData,
            numberOfLines,
            minWinningSameCols
        } = this.state

        console.log(gameValuesData)

        const winningCombinations = []

        for (let iconIndex = 0; iconIndex < AVAILABLE_ICON_NAMES.length; iconIndex++) {
            const icon = AVAILABLE_ICON_NAMES[iconIndex]

            for (let count = minWinningSameCols; count <= numberOfLines; count++) {
                const value = gameValuesData[count - minWinningSameCols]

                const combination = {
                    icon,
                    requiredSameSiblingsCount: count,
                    value,
                }

                winningCombinations.push(combination)
            }
        }

        console.log(winningCombinations)

        return winningCombinations
    };

    generateFruitMachineLineColIconNames = (numberOfElements, isWin = false) => {
        const colElements = []

        for (let colNumber = 0; colNumber < numberOfElements; colNumber++) {
            colElements.push({
                iconName: this.getColIconName(colNumber > 0 ? colElements[colNumber - 1].iconName : null, isWin)
            })
        }

        return colElements
    }

    spin = async (currentSpinCount = 0, targetSpinCount = 100) => {
        const newLines = [...this.state.lines]
        const prependedElement = newLines.pop()

        prependedElement.cols = await this.getRandomColIcons(this.state.numberOfLines)

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
            }, this.state.slideAnimationTimeMs)
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

        console.log(this.state.gameValuesData)

        this.setSlideAnimationVariable()
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

        const isLoadingLines = this.state.lines.length !== this.state.numberOfLines
        const costLabel = ' za ' + costValue * gameMultiplierValue + ' ' + currencyName
        const jackpotValue = this.getJackpotValue()

        return (
            <div>
                {isLoading || isLoadingLines ? <Loader/> : (
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
