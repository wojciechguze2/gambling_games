import React, { Component } from 'react'
import {
    SET_USER_ACCOUNT_BALANCE,
    UPDATE_USER_ACCOUNT_BALANCE
} from '../types/authTypes'
import { getDemoGameResult, getGameData, getGameResult } from '../service/game'
import { getAccountBalance } from '../service/user'


class AbstractLotteryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            isWin: null,
            gameId: null,
            gameValuesData: [],
            result: {},
            resultCurrencyName: null,
            costValue: null,
            currencyName: null,
            errorMessage: null,
            costMessage: null,
            winMessage: null,
        };
    }

    lotteryComponentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.setGameData()
        await this.setAccountBalance()
        this.setState({ isLoading: false })
    }

    setGameData = async () => {
        const data = await getGameData(this.props.gameCode)

        const game = data.game
        const gameId = game.id
        const gameValuesData = game.GameValues
        const costValue = data.costValue
        const currencyName = data.currencyName

        await this.setState({ gameId, gameValuesData, costValue, currencyName })
    }

    setAccountBalance = async () => {
        if (this.state.user) {
            const response = await getAccountBalance()

            if (response.status <= 299) {
                this.props.dispatch({ type: SET_USER_ACCOUNT_BALANCE, payload: response.data })
            }
        }
    }

    getRandomGameResult = async () => {
        try {
            if (this.state.isDemo) {
                return await getDemoGameResult(this.state.gameId)
            } else {
                const {
                    costValue,
                    gameMultiplierValue
                } = this.state

                const postData = {
                    costValue: costValue * gameMultiplierValue,
                    gameMultiplier: gameMultiplierValue
                }

                return await getGameResult(this.state.gameId, postData)
            }
        } catch (err) {
            const errorResponse = (err || {}).response
            let errorMessage

            if (errorResponse.status === 409) {
                errorMessage = 'Brak środków na koncie. Doładuj swoje konto'

                if (this.state.user && !this.state.isDemo) {
                    this.props.dispatch({
                        type: UPDATE_USER_ACCOUNT_BALANCE,
                        payload: +(this.state.costValue * this.state.gameMultiplierValue)
                    })
                }
            } else if (errorResponse.status === 400) {
                errorMessage = 'Niepoprawne dane wejściowe. Prosimy o kontakt'
            }  else if (errorResponse.status === 404) {
                errorMessage = 'Gra jest obecnie niedostępna.'
            } else {
                console.error(errorResponse)
                errorMessage = 'Wystąpił błąd. Prosimy o kontakt.'
            }

            this.setState({ errorMessage })
        }

        return false
    };


    hasRequiredAccountBalance = () => {
        return this.state.isDemo ? true : (
            !this.state.user ? false : (
                this.state.user.accountBalance >= this.state.costValue * this.state.gameMultiplierValue
            )
        )
    }

    resetResult = () => {
        this.setState({
            result: {},
            resultCurrencyName: null,
            winMessage: null,
            costMessage: null,
            errorMessage: null,
            isWin: null
        });
    }

    changeGameMultiplier = (gameMultiplierValue) => {
        this.setState({ gameMultiplierValue })
        this.resetResult()
    }

    handleTopUpChange = (accountBalance) => {
        this.setState({ userAccountBalance: accountBalance })
        this.props.dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: accountBalance})
    }

    isWinningGameValue = (gameValueId) => {
        return this.state.result && this.state.result.id === gameValueId
    }

    getJackpotValue = () => {
        if (this.state.gameValuesData) {
            return this.state.gameValuesData.find(value => value.isJackpot === true).value
        }

        return '?'
    }
}

export default AbstractLotteryComponent
