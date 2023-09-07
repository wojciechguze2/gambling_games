import React, { Component } from 'react'
import '../styles/wheel-of-fortune.scss'
import axios from '../utils/axiosConfig'
import {
    SET_USER_ACCOUNT_BALANCE
} from '../types/authTypes'


class AbstractLotteryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            isWin: null,
            hasPlayedGame: false,
            isPlayingGame: false,
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

    setGameData = async () => {
        const gameCode = this.props.gameCode

        const url = `/api/games/${gameCode}`
        const response = await axios.get(url)

        const game = response.data.game

        const gameId = game.id
        const gameValuesData = game.GameValues
        const costValue = response.data.costValue
        const currencyName = response.data.currencyName

        await this.setState({ gameId, gameValuesData, costValue, currencyName })
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

    getRandomGameResult = async () => {
        if (this.state.isDemo) {
            const url = `/api/games/${this.state.gameId}/demo`
            const response = await axios.get(url)

            return response.data
        } else {
            const url = `/api/games/${this.state.gameId}/result`
            const { costValue, gameMultiplierValue } = this.state
            const postData = {
                costValue: costValue * gameMultiplierValue,
                gameMultiplier: gameMultiplierValue
            }

            const response = await axios.post(url, postData)

            return response.data
        }
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
}

export default AbstractLotteryComponent
