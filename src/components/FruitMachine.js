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
    'appleWhole': {
        icon: faAppleWhole,
        color: 'red'
    },
    'carrot': {
        icon: faCarrot,
        color: 'orange'
    },
    'coffee': {
        icon: faCoffee,
        color: 'white'
    },
    'leaf': {
        icon: faLeaf,
        color: 'green'
    },
    'lemon': {
        icon: faLemon,
        color: 'yellow'
    },
    'pepperHot': {
        icon: faPepperHot,
        color: 'orangered'
    },
    'heart': {
        icon: faHeart,
        color: 'crimson'
    },
    'bomb': {
        icon: faBomb,
        color: 'brown'
    },
    'bolt': {
        icon: faBolt,
        color: 'lightgray'
    },
    'bug': {
        icon: faBug,
        color: 'royalblue'
    }
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
            slideAnimationTimeMs: 60,
            minWinningSameCols: 3,
            minSpinCount: 15,
            maxSpinCount: 30,
            isLotteryRunning: false,
            isRunAgainLotteryAvailable: false,
            numberOfLines: props.numberOfLines ? props.numberOfLines : 5,
            lines: [],
            winningCombinations: []
        };
    }

    async componentDidMount() {
        await this.lotteryComponentDidMount()
        await this.setRandomLines()
        await this.setSlideAnimationVariable()
    }

    isRunLotteryAvailable = () => {
        return (
            !this.state.isLotteryRunning
            && this.hasRequiredAccountBalance()
        )
    }
    
    getRandomColIcons = async (numberOfLines, isResultSpin = false) => {
        let resultCombination
        const colIconsData = []

        if (isResultSpin) {
            const { winningCombinations, result } = this.state
            const matchingWinningCombinations = winningCombinations.filter(
                combination => combination.value.value === result.value
            )
            const randomMatchingWinningCombinationIndex = Math.floor(Math.random() * matchingWinningCombinations.length)
            resultCombination = matchingWinningCombinations[randomMatchingWinningCombinationIndex]
        }

        const colsData = this.generateFruitMachineLineColData(numberOfLines, isResultSpin, resultCombination)
        let isFirstResult = true

        for (let colNumber = 0; colNumber < numberOfLines; colNumber++) {
            const colData = colsData[colNumber]
            const iconData = AVAILABLE_ICONS[colData.iconName]
            const isLastResult = colNumber === colsData.length - 1 || !colsData[colNumber + 1].isResult
            const data = {
                iconData,
                isResult: colData.isResult || false,
                resultClassNames: null
            }

            if (colData.isResult) {
                if (isFirstResult) {
                    data.resultClassNames = 'first-result'
                    isFirstResult = false
                } else if (isLastResult) {
                    data.resultClassNames = 'last-result'
                } else {
                    data.resultClassNames = 'middle-result'
                }
            }

            colIconsData.push(data)
        }

        return colIconsData
    }

    getRandomColIconName = (previousIconName = null) => {
        let availableIcons

        if (previousIconName) {
            availableIcons = AVAILABLE_ICON_NAMES.filter(iconName => iconName !== previousIconName)
        } else {
            availableIcons = AVAILABLE_ICON_NAMES
        }

        return availableIcons[Math.floor(Math.random() * availableIcons.length)]
    }

    getFruitMachineCols = (line) => {
        const {
            numberOfLines,
            winMessage
        } = this.state
        const cols = []

        for (let colNumber = 0; colNumber < numberOfLines; colNumber++) {  // cols
            const colElement = line.cols[colNumber]

            cols.push(
                <div
                    key={colNumber}
                    className={`fruit-machine--line--element${colElement.isResult && winMessage ? ' result-line-element blink-text' : ''} ${colElement.resultClassNames || ''}`}
                >
                    <FontAwesomeIcon
                        icon={colElement.iconData.icon}
                        className="fa-4x"
                        style={{color: colElement.iconData.color}}
                    />
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

    getWinningCombinationsTableRows = (winningCombinations, gameMultiplierValue) => {
        const {
            numberOfLines,
            minWinningSameCols
        } = this.state
        const rows = []
        const numberOfIconMultipliers = numberOfLines - minWinningSameCols + 1

        for (let winningCombinationIndex = winningCombinations.length - 1; winningCombinationIndex >= 0; winningCombinationIndex--) {
            const winningCombination = winningCombinations[winningCombinationIndex]
            const iconData = AVAILABLE_ICONS[winningCombination.icon]

            rows.push(
                <tr key={`winning-combination-row--${winningCombinationIndex}`} className="fw-bold fs-5 align-middle">
                    {(winningCombinationIndex + 1) % numberOfIconMultipliers === 0 && (
                        <td rowSpan={numberOfIconMultipliers} className="border-1">
                            <FontAwesomeIcon
                                icon={iconData.icon}
                                className="fa-3x"
                                style={{color: iconData.color}}
                            />
                        </td>
                    )}
                    <td>
                        { winningCombination.requiredSameSiblingsCount } x
                    </td>
                    <td className={winningCombination.value.isJackpot ? 'text-danger' : ''}>
                        { winningCombination.value.value * gameMultiplierValue }
                    </td>
                </tr>
            )
        }

        return rows
    }

    getWinningCombinationsTable = () => {
        const {
            winningCombinations,
            gameMultiplierValue
        } = this.state

        return (
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th colSpan={3}>
                            Tabela wyników
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Ikona
                        </th>
                        <th>
                            Wymagana ilość (obok siebie w tym samym rzędzie)
                        </th>
                        <th>
                            Wartość wygranej
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getWinningCombinationsTableRows(winningCombinations, gameMultiplierValue)}
                </tbody>
            </table>
        )
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

    setWinningCombinations = async () => {
        const winningCombinations = await this.generateFruitMachineWinningCombinations()

        this.setState({ winningCombinations })
    }

    setSlideAnimationVariable = async (slideAnimationTimeMs) => {
        if (slideAnimationTimeMs) {
            await this.setState({
                slideAnimationTimeMs
            })
        }

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

    generateFruitMachineWinningCombinations = async () => {
        const {
            numberOfLines,
            minWinningSameCols,
            gameValuesData
        } = this.state

        const winningCombinations = [];

        for (let iconIndex = 0; iconIndex < AVAILABLE_ICON_NAMES.length; iconIndex++) {
            const icon = AVAILABLE_ICON_NAMES[iconIndex]
            const iconCombinations = []
            const iconCombinationsValues = []

            for (let count = minWinningSameCols; count <= numberOfLines; count++) {
                const availableCombinationValues = gameValuesData.filter(
                    valueData => !iconCombinationsValues.includes(valueData.value)
                )

                const randomCombinationValueIndex = Math.floor(Math.random() * availableCombinationValues.length)
                const uniqueIconValue = availableCombinationValues[randomCombinationValueIndex]

                const combination = {
                    icon,
                    requiredSameSiblingsCount: count,
                    value: uniqueIconValue,
                }

                iconCombinationsValues.push(uniqueIconValue.value)

                iconCombinations.push(combination)
            }

            iconCombinations.sort((a, b) => {
                const compareResult = b.requiredSameSiblingsCount - a.requiredSameSiblingsCount

                return compareResult !== 0 ? compareResult : b.value.value - a.value.value
            })

            for (let iconCombinationIndex = 0; iconCombinationIndex < iconCombinations.length; iconCombinationIndex++) {
                const iconCombination = iconCombinations[iconCombinationIndex]

                const combinationsWithHigherValue = iconCombinations.slice(
                    iconCombinationIndex + 1
                ).filter(
                    c => c.value.value > iconCombination.value.value
                )

                if (combinationsWithHigherValue.length > 0) {
                    const combinationWithHigherValue = combinationsWithHigherValue.reduce((prev, current) => {
                        return prev.value.value > current.value.value ? prev : current;
                    });

                    [
                        combinationWithHigherValue.value,
                        iconCombination.value
                    ] = [
                        iconCombination.value,
                        combinationWithHigherValue.value
                    ]

                    /*
                    same as:
                    const tmp = combinationWithHigherValue.value

                    combinationWithHigherValue.value = iconCombination.value
                    iconCombination.value = tmp
                     */
                }
            }

            winningCombinations.push(...iconCombinations)
        }

        return winningCombinations
    };

    generateResultFruitMachineLineColData = (
        numberOfElements,
        resultCombination
    ) => {
        const {
            icon,
            requiredSameSiblingsCount
        } = resultCombination

        let colsData = [
            ...Array.from(
                {
                    length: requiredSameSiblingsCount
                },
                () => ({
                    iconName: icon,
                    isResult: true
                })
            )
        ]

        if (requiredSameSiblingsCount >= numberOfElements) {
            return colsData
        }

        const randomIconElementsCount = numberOfElements - requiredSameSiblingsCount
        const fillElementsBeforeResult = Math.random() < 0.5  // prefer adding random icon(s) before result icons

        if (randomIconElementsCount > 1) {
            const elementsBeforeResultCount = Math.floor(Math.random() * (randomIconElementsCount)) + 1
            const elementsAfterResultCount = randomIconElementsCount - elementsBeforeResultCount

            if (elementsBeforeResultCount) {
                const elementsBeforeResult = []

                for (let colNumber = 0; colNumber < elementsBeforeResultCount; colNumber++) {
                    const previousIconName = colNumber > 0 ? elementsBeforeResult[colNumber - 1].iconName : null

                    elementsBeforeResult.push({
                        iconName: this.getRandomColIconName(previousIconName)
                    })
                }

                colsData = [...elementsBeforeResult, ...colsData]
            }

            if (elementsAfterResultCount) {
                const elementsAfterResult = []

                for (let colNumber = 0; colNumber < elementsAfterResultCount; colNumber++) {
                    const previousIconName = colNumber > 0 ? elementsAfterResult[colNumber - 1].iconName : null

                    elementsAfterResult.push({
                        iconName: this.getRandomColIconName(previousIconName)
                    })
                }

                colsData = [...colsData, ...elementsAfterResult]
            }

            return colsData
        }

        const randomIcon = {
            iconName: this.getRandomColIconName(icon)
        }

        if (fillElementsBeforeResult) {
            colsData = [randomIcon, ...colsData]
        } else {
            colsData = [...colsData, randomIcon]
        }

        return colsData
    }

    generateRandomFruitMachineLineColData = (numberOfElements) => {
        const colsData = []

        for (let colNumber = 0; colNumber < numberOfElements; colNumber++) {
            const previousIconName = colNumber > 0 ? colsData[colNumber - 1].iconName : null

            colsData.push({
                iconName: this.getRandomColIconName(previousIconName)
            })
        }

        return colsData
    }

    generateFruitMachineLineColData = (
        numberOfElements,
        isResultSpin = false,
        resultCombination = null
    ) => {
        if (isResultSpin && resultCombination) {
            return this.generateResultFruitMachineLineColData(numberOfElements, resultCombination)
        } else {
            return this.generateRandomFruitMachineLineColData(numberOfElements)
        }
    }

    getResultData = async () => {
        const data = await this.getRandomGameResult()

        if (!data) {
            return null
        }

        if (!data.result) {
            this.setError()

            return null
        }

        return data
    }

    spinUpdateLines = async (lines, numberOfLines, isResultSpin) => {
        const newLines = [...lines]
        const prependedElement = newLines.pop()

        prependedElement.cols = await this.getRandomColIcons(numberOfLines, isResultSpin)
        newLines.unshift(prependedElement)

        this.setState({
            lines: newLines
        })
    }

    spin = async (
        currentSpinCount = 0,
        targetSpinCount = 10,
        resultSpin,
        apiResultSpin,
        isWin = null,
        userAccountBalance = null
    ) => {
        if (!resultSpin || resultSpin > targetSpinCount) {
            resultSpin = targetSpinCount - 1
        }

        const {
            numberOfLines,
            slideAnimationTimeMs,
            lines
        } = this.state

        const isApiResultSpin = currentSpinCount === apiResultSpin
        const isResultSpin = currentSpinCount === resultSpin
        const isLastSpin = currentSpinCount === targetSpinCount

        if (isApiResultSpin) {
            const resultData = await this.getResultData()

            this.setState({
                result: resultData.result,
                resultCurrencyName: resultData.currencyName
            })

            isWin = resultData.isWin
            userAccountBalance = resultData.userAccountBalance
        }

        if (isResultSpin) {
            await this.setSlideAnimationVariable(125)
        }

        if (isLastSpin && isWin !== null) {
            this.setState({
                isWin,
                userAccountBalance
            })
        }

        await this.spinUpdateLines(lines, numberOfLines, isResultSpin)

        await new Promise((resolve) => {
            setTimeout(() => {
                if (currentSpinCount < targetSpinCount) {
                    this.spin(
                        ++currentSpinCount,
                        targetSpinCount,
                        resultSpin,
                        apiResultSpin,
                        isWin,
                        userAccountBalance
                    ).then(resolve)
                } else {
                    resolve()
                }
            }, slideAnimationTimeMs)
        })
    }

    setResult = () => {
        const {
            costValue,
            gameMultiplierValue,
            currencyName,
            resultCurrencyName,
            userAccountBalance,
            result
        } = this.state

        const costMessage = (
            'Zapłacono: ' + costValue * gameMultiplierValue + ' ' + currencyName
        )
        const winMessage = (
            'Wylosowano: ' + result.value * gameMultiplierValue + ' ' + resultCurrencyName
        )

        if (this.state.user) {
            this.props.dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: userAccountBalance})
        }

        this.setState({
            costMessage,
            winMessage,
            isRunAgainLotteryAvailable: true
        })
    }

    runLottery = async () => {
        const {
            minSpinCount,
            maxSpinCount,
            numberOfLines
        } = this.state

        if (!this.hasRequiredAccountBalance()) {
            return false
        }

        this.resetResult()
        this.setState({
            isLotteryRunning: true,
            isRunAgainLotteryAvailable: false
        })

        if (this.state.user) {
            const {
                costValue,
                gameMultiplierValue
            } = this.state

            this.props.dispatch({ type: UPDATE_USER_ACCOUNT_BALANCE, payload: -(costValue * gameMultiplierValue) })
        }

        await this.setSlideAnimationVariable(60)
        await this.setWinningCombinations()

        const targetSpinCount = Math.floor(Math.random() * (maxSpinCount - minSpinCount + 1)) + minSpinCount
        const resultSpin = targetSpinCount - Math.floor(Math.random() * (numberOfLines))
        const apiResultSpin = resultSpin > 10 ? Math.floor(targetSpinCount / 2 - 1) : Math.floor(minSpinCount / 2)

        await this.spin(0, targetSpinCount, resultSpin, apiResultSpin)

        this.setResult()
    }

    runAgainLottery = async () => {
        this.resetResult()
        await this.runLottery()
    }

    render() {
        const {
            currencyName,
            isLoading,
            isLotteryRunning,
            isRunAgainLotteryAvailable,
            isDemo,
            isWin,
            errorMessage,
            winMessage,
            costMessage,
            costValue,
            gameMultiplierValue,
        } = this.state

        const isLoadingLines = this.state.lines.length !== this.state.numberOfLines
        const costLabel = ' za ' + costValue * gameMultiplierValue + ' ' + currencyName
        const jackpotValue = this.getJackpotValue() * gameMultiplierValue

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
                                <p className="fs-6">
                                    Maksymalna możliwa wygrana: <span className="text-danger fw-bold">{jackpotValue} {currencyName}</span>
                                </p>
                            )}
                        </div>
                        <div className="fruit-machine d-flex shadow-lg">
                            {this.getFruitMachineGrid()}
                        </div>
                        <div className="fruit-machine-alerts alerts mt-3 mb-5"> {/* todo: move alerts to new component */}
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
                        {/* todo: move buttons to new component if possible */}
                        <div className="fruit-machine-buttons mt-3 mb-5">
                            {isRunAgainLotteryAvailable ? (
                                <button
                                    className={`btn btn-warning play-again-button btn-lg text-dark fw-bold my-2`}
                                    onClick={this.runAgainLottery}
                                    disabled={!this.hasRequiredAccountBalance()}
                                >
                                    Zagraj {costLabel}
                                </button>
                            ) : (
                                <button
                                    className={`btn btn-warning play-button btn-lg text-dark fw-bold my-2`}
                                    onClick={this.runLottery}
                                    disabled={!this.isRunLotteryAvailable()}
                                >
                                    Zagraj {costLabel}
                                </button>
                            )}
                            {!isDemo && (
                                <GameMultiplier
                                    disabled={!this.isRunLotteryAvailable() && !isRunAgainLotteryAvailable}
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
                        {isRunAgainLotteryAvailable && isWin !== null && (
                            <>
                                {this.getWinningCombinationsTable()}
                            </>
                        )}
                    </>
                )}
            </div>
        )
    }
}

export default FruitMachine
