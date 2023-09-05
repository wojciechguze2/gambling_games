import React, { Component } from 'react'
import '../styles/wheel-of-fortune.scss'
import axios from '../utils/axiosConfig'
import {
    SET_USER_ACCOUNT_BALANCE,
    UPDATE_USER_ACCOUNT_BALANCE
} from '../types/authTypes'
import AccountBalance from './AccountBalance'
import TopUpAccountButton from './TopUpAccountButton'

class WheelOfFortune extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyName: null,
            costValue: null,
            gameId: 1,
            isDemo: this.props.isDemo || !this.props.user,
            user: this.props.user,
            result: {},
            resultCurrencyName: null,
            isFakeSpinning: false,
            isSpinning: false,
            choicesData: [],
            startAngle: 0,
            finalAngle: 0,
            contentAngle: 0,
            circleAngle: 360,
            fakeSpinDelay: 900,
            spinDelay: 4950,
            errorMessage: null,
            costMessage: null,
            winMessage: null,
            isWin: null,
            userAccountBalance: this.props.user ? this.props.user.accountBalance : null
        };
    }

    async componentDidMount() {
        await this.setGameData()
        await this.setAccountBalance()

        document.documentElement.style.setProperty('--startAngle', `${this.state.startAngle}deg`);
        document.documentElement.style.setProperty('--finalAngle', `${this.state.finalAngle}deg`);
    }

    isGamePlayed = () => {
        return (
            !this.state.isSpinning
            && !this.state.isFakeSpinning
            && this.state.result
            && this.state.result.id
        )
    }

    isWinningChoice = (choiceId) => {
        return this.state.result && this.state.result.id === choiceId
    }

    hasRequiredAccountBalance = () => {
        return this.state.isDemo ? true : this.state.user.accountBalance >= this.state.costValue
    }

    handleTopUpChange = (accountBalance) => {
        this.setState({ userAccountBalance: accountBalance })
        this.props.dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: accountBalance})
    }

    setAccountBalance = async () => {
        if (this.state.user) {
            const url = 'api/user/account-balance'
            const response = await axios.get(url)

            if (response.status <= 299) {
                this.props.dispatch({ type: SET_USER_ACCOUNT_BALANCE, payload: response.data })
            }
        }
    }

    setGameData = async () => {
        const url = `/api/games/${this.state.gameId}`
        const response = await axios.get(url)

        const game = response.data.game
        const choicesData = game['GameValues']
        const costValue = response.data.costValue
        const currencyName = response.data.currencyName

        this.setState({ choicesData, costValue, currencyName })
    }

    getChoices = () => {
        const { winChoiceClass, winChoiceTextAddition } = this.props
        let currentAngle = 0;

        return this.state.choicesData.map((choice, index) => {
            const rotate = `rotate(${currentAngle}deg)`;
            currentAngle += this.state.circleAngle / this.state.choicesData.length;

            return (
                <div
                    key={index}
                    className={`wheel-of-fortune--choice ${this.isWinningChoice(choice.id) ? winChoiceClass : ''}`}
                    style={{ transform: rotate }}
                >
                    {choice.value} {choice.Currency.name} {this.isWinningChoice(choice.id) ? winChoiceTextAddition : ''}
                </div>
            );
        });
    };

    getRandomGameResult = async () => {
        if (this.state.isDemo) {
            const url = `/api/games/${this.state.gameId}/demo`
            const response = await axios.get(url)

            return response.data
        } else {
            const url = `/api/games/${this.state.gameId}/result`
            const { costValue } = this.state;
            const postData = {
                costValue
            }
            const response = await axios.post(url, postData)

            return response.data
        }
    };

    setError = (errorMessage = null) => {
        if (!errorMessage) {
            errorMessage = 'Wystąpił niezidentyfikowany błąd. Prosimy o kontakt.'
        }

        this.setState({
            errorMessage,
            contentAngle: 0,
            startAngle: 0,
            finalAngle: 0,
            isSpinning: false,
            isFakeSpinning: false,
            resultCurrencyName: null,
            costMessage: null,
            winMessage: null,
            isWin: null
        });
    }

    fakeSpinWheel = async () => {
        if (!this.hasRequiredAccountBalance()) {
            return false
        }

        this.setState({
            isFakeSpinning: true,
            result: {},
            resultCurrencyName: null,
            winMessage: null,
            costMessage: null,
            errorMessage: null,
            isWin: null
        });

        if (this.state.user) {
            const { costValue } = this.state

            this.props.dispatch({ type: UPDATE_USER_ACCOUNT_BALANCE, payload: -costValue })
        }

        await new Promise(resolve => setTimeout(resolve, this.state.fakeSpinDelay));

        await this.spinWheel();
    }

    spinWheel = async () => {
        this.setState({ isFakeSpinning: false, isSpinning: true });

        let result,
            resultCurrencyName,
            isWin,
            userAccountBalance

        try {
            const response = await this.getRandomGameResult();
            result = response.result
            resultCurrencyName = response.currencyName
            isWin = response.isWin
            userAccountBalance = response.userAccountBalance
        } catch (err) {
            const errorResponse = (err || {}).response
            let errorMessage

            if (errorResponse.status === 409) {
                errorMessage = 'Brak środków na koncie. Doładuj swoje konto'

                if (this.state.user && !this.state.isDemo) {
                    this.props.dispatch({type: UPDATE_USER_ACCOUNT_BALANCE, payload: +this.state.costValue})
                }
            } else if (errorResponse.status === 400) {
                errorMessage = 'Niepoprawne dane wejściowe. Prosimy o kontakt'
            }  else if (errorResponse.status === 404) {
                errorMessage = 'Gra jest obecnie niedostępna.'
            } else {
                console.error(errorResponse)
                errorMessage = 'Wystąpił błąd. Prosimy o kontakt.'
            }

            this.setError(errorMessage)

            return null
        }

        if (!result) {
            this.setError()

            return null
        }

        const totalChoices = this.state.choicesData.length;
        const resultIndex = this.state.choicesData.findIndex(choice => choice.id === result.id) + 1;

        const finalAngle = (
            this.state.circleAngle * 10 // for prettier animation
            - (this.state.circleAngle / totalChoices) * resultIndex  // it's winning choice angle
            + (this.state.circleAngle / totalChoices)  // it's single choice angle
        );

        this.setState({result, resultCurrencyName, finalAngle, isWin, userAccountBalance})
        document.documentElement.style.setProperty('--startAngle', `0deg`);
        document.documentElement.style.setProperty('--finalAngle', `${finalAngle}deg`);

        await new Promise(resolve => setTimeout(resolve, this.state.spinDelay));

        await this.setWheelResult(finalAngle)
    };

    setWheelResult = async (finalAngle) => {
        const costMessage = 'Zapłacono: ' + this.state.costValue + ' ' + this.state.currencyName
        const winMessage = 'Wylosowano: ' + this.state.result.value + ' ' + this.state.resultCurrencyName

        this.setState({ contentAngle: finalAngle, isSpinning: false, costMessage, winMessage })

        if (this.state.user) {
            this.props.dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: this.state.userAccountBalance})
        }

        document.documentElement.style.setProperty('--contentAngle', `${finalAngle}deg`)
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
            errorMessage,
            costMessage,
            winMessage,
            costValue,
            currencyName,
            isWin,
            isDemo,
        } = this.state;

        const costLabel = ' za ' + costValue + ' ' + currencyName

        return (
            <div>
                <div className="wheel-of-fortune-container">
                    <div
                        className={`wheel-of-fortune-win-indicator my-auto d-inline-flex ${this.isGamePlayed() ? winIndicatorClass : '' }`}
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
                    <div className="alerts w-50 mx-auto">
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {costMessage && !isDemo && <div className="alert alert-warning">{costMessage}</div>}
                        {winMessage && !isDemo && <div className={`alert alert-${isWin === false ? 'danger' : 'success'}`}>{winMessage}</div>}
                    </div>
                    <button
                        className={`btn btn-warning btn-lg w-50 text-dark fw-bold my-2 ${isSpinning || isFakeSpinning ? 'disabled' : ''}`}
                        onClick={this.fakeSpinWheel}
                        disabled={isSpinning || !this.hasRequiredAccountBalance()}
                    >
                        {playButtonLabel}
                        {costLabel && !isDemo ? costLabel : ''}
                    </button>
                    {!isDemo && <AccountBalance disabled={isSpinning || isFakeSpinning}/>}
                    {!this.hasRequiredAccountBalance() && <TopUpAccountButton handleTopUpChange={this.handleTopUpChange} disabled={isSpinning || isFakeSpinning} />}
                </div>
            </div>
        );
    }
}

export default WheelOfFortune;
