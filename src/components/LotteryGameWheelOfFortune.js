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
import Lottery from './Lottery'
import LotteryAlerts from './LotteryAlerts'
import LotteryTitle from './LotteryTitle'


class LotteryGameWheelOfFortune extends Lottery {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            gameMultiplierValue: props.initialMultiplier || 1,
            userAccountBalance: props.user ? props.user.accountBalance : null,
            isDemo: props.isDemo || !props.user,
            gameCode: props.gameCode,
            ...super.state,
            isFakeSpinning: false,
            isSpinning: false,
            startAngle: 0,
            finalAngle: 0,
            contentAngle: 0,
            circleAngle: 360,
            fakeSpinDelay: 900,
            spinDelay: 4850,
        };
    }

    async componentDidMount() {
        await this.lotteryComponentDidMount()

        document.documentElement.style.setProperty('--startAngle', `${this.state.startAngle}deg`);
        document.documentElement.style.setProperty('--finalAngle', `${this.state.finalAngle}deg`);
    }

    getChoices = () => {
        const { winChoiceClass, winChoiceTextAddition, jackpotChoiceClass } = this.props
        const { circleAngle, gameValuesData, gameMultiplierValue } = this.state
        let currentAngle = 0;

        if (!gameValuesData || !gameValuesData.length) {
            return <Loader />
        }

        return gameValuesData.map((choice, index) => {
            const rotate = `rotate(${currentAngle}deg)`
            currentAngle += circleAngle / gameValuesData.length

            const _isWinningChoice = this.isWinningGameValue(choice.id)
            const _isJackpot = !_isWinningChoice && choice.isJackpot
            const choiceValue = choice.value * gameMultiplierValue

            return (
                <div
                    key={index}
                    className={`wheel-of-fortune--choice ${_isJackpot ? jackpotChoiceClass : ''} ${_isWinningChoice ? winChoiceClass : ''}`}
                    style={{ transform: rotate }}
                    data-value={choiceValue}
                >
                    {choiceValue} {choice.Currency.name} {_isWinningChoice ? winChoiceTextAddition : ''}
                </div>
            );
        });
    };

    hasPlayedGame = () => {
        return (
            !this.state.isSpinning
            && !this.state.isFakeSpinning
            && this.state.result
            && this.state.result.id
        )
    }

    setError = (errorMessage = null) => {
        if (!errorMessage) {
            errorMessage = 'Wystąpił niezidentyfikowany błąd. Prosimy o kontakt.'
        }

        this.resetResult()
        this.setState({
            errorMessage,
            contentAngle: 0,
            startAngle: 0,
            finalAngle: 0,
            isSpinning: false,
            isFakeSpinning: false,
        })
    }

    fakeSpinWheel = async () => {
        if (!this.hasRequiredAccountBalance()) {
            return false
        }

        this.resetResult()
        this.setState({
            isFakeSpinning: true,
        })
        this.scrollToMainContainer()

        if (this.state.user) {
            const { costValue, gameMultiplierValue } = this.state

            this.props.dispatch({ type: UPDATE_USER_ACCOUNT_BALANCE, payload: -(costValue * gameMultiplierValue) })
        }

        await new Promise(resolve => setTimeout(resolve, this.state.fakeSpinDelay));

        await this.spinWheel();
    }

    spinWheel = async () => {
        this.setState({ isFakeSpinning: false, isSpinning: true });

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

        const totalChoices = this.state.gameValuesData.length;
        const resultIndex = this.state.gameValuesData.findIndex(choice => choice.id === result.id) + 1;

        const finalAngle = (
            this.state.circleAngle * 10 // for prettier animation
            - (this.state.circleAngle / totalChoices) * resultIndex  // it's winning choice angle
            + (this.state.circleAngle / totalChoices)  // it's single choice angle
        );

        this.setState({result, resultCurrencyName: currencyName, finalAngle, isWin, userAccountBalance})
        document.documentElement.style.setProperty('--startAngle', `0deg`);
        document.documentElement.style.setProperty('--finalAngle', `${finalAngle}deg`);

        await new Promise(resolve => setTimeout(resolve, this.state.spinDelay));

        await this.setWheelResult(finalAngle)
    };

    setWheelResult = async (finalAngle) => {
        const costMessage = (
            'Zapłacono: ' + this.state.costValue * this.state.gameMultiplierValue + ' ' + this.state.currencyName
        )
        const winMessage = (
            'Wylosowano: ' + this.state.result.value * this.state.gameMultiplierValue + ' ' + this.state.resultCurrencyName
        )

        this.setState({ contentAngle: finalAngle, isSpinning: false, costMessage, winMessage })
        document.documentElement.style.setProperty('--contentAngle', `${finalAngle}deg`)

        if (this.state.user) {
            this.props.dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: this.state.userAccountBalance})
        }
    }

    render() {
        const {
            containerClass,
            contentClass,
            winIndicatorClass,
            playButtonLabel
        } = this.props;

        const {
            isSpinning,
            isFakeSpinning,
            isWin,
            isDemo,
            isLoading,
            errorMessage,
            costMessage,
            winMessage,
            costValue,
            currencyName,
            gameMultiplierValue
        } = this.state;

        const _jackpotValue = this.getJackpotValue()
        const jackpotValue = _jackpotValue ? _jackpotValue * gameMultiplierValue : '?'
        const costLabel = ' za ' + costValue * gameMultiplierValue + ' ' + currencyName

        return (
            <div>
                {isLoading ? <Loader/> : (
                    <>
                        <LotteryTitle
                            title={`Koło fortuny${isDemo ? ' DEMO' : ''}`}
                            isLotteryRunning={isSpinning || isFakeSpinning}
                            isWin={isWin !== null && !isSpinning ? true : null}
                            isDemo={isDemo}
                            jackpotValue={jackpotValue}
                            currencyName={currencyName}
                            additionalClass={'mt-5'}
                        />
                        <div className="wheel-of-fortune-container">
                            <div
                                className={`wheel-of-fortune-win-indicator my-auto d-inline-flex ${this.hasPlayedGame() ? winIndicatorClass : '' }`}
                            />
                            <div className={`wheel-of-fortune ${containerClass}`}>
                                <div
                                    className={`wheel-of-fortune--content ${isSpinning ? 'spin' : ''} ${isFakeSpinning ? 'fake-spin' : ''} ${contentClass}`}
                                    style={{transform: `rotate(${this.state.contentAngle}deg)`}}
                                >
                                    {this.getChoices()}
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto mb-5">
                            <div className="wheel-of-fortune-game-buttons">
                                <button
                                    className={`btn btn-warning play-button btn-lg text-dark fw-bold my-2 ${isSpinning || isFakeSpinning ? 'disabled' : ''}`}
                                    onClick={this.fakeSpinWheel}
                                    disabled={isSpinning || !this.hasRequiredAccountBalance()}
                                >
                                    {playButtonLabel}
                                    {costLabel && !isDemo ? costLabel : ''}
                                </button>
                                {!isDemo && (
                                    <GameMultiplier
                                        disabled={isSpinning || isFakeSpinning}
                                        handleGameMultiplierChange={this.changeGameMultiplier}
                                        currentMultiplier={gameMultiplierValue}
                                        availableMultipliers={[0.5, 1, 2, 5]}
                                    />
                                )}
                            </div>
                            {!isDemo && (
                                <AccountBalance
                                    disabled={isSpinning || isFakeSpinning}
                                />
                            )}
                            {!this.hasRequiredAccountBalance() && (
                                <TopUpAccountButton
                                    handleTopUpChange={this.handleTopUpChange}
                                    disabled={isSpinning || isFakeSpinning}
                                />
                            )}
                            <LotteryAlerts
                                errorMessage={errorMessage}
                                costMessage={costMessage}
                                winMessage={winMessage}
                                isDemo={isDemo}
                                isWin={isWin}
                                additionalClass={'wheel-of-fortune-alerts mx-auto mt-2'}
                            />
                        </div>
                    </>
                )}

            </div>
        );
    }
}

export default LotteryGameWheelOfFortune;
