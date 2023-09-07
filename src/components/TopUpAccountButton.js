import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../utils/axiosConfig'
import { SET_USER_ACCOUNT_BALANCE } from '../types/authTypes'
import Loader from './Loader'

const TopUpAccountButton = ({ disabled, handleTopUpChange, additionalClass = '' }) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)

    if (!user) {
        return <></>
    }

    const topUpAccount = async () => {
        // todo: maybe improve this in the future

        if (disabled) {
            return
        }

        const url = 'api/user/account-balance/add'

        try {
            setLoading(true)
            const response = await axios.patch(url, { value: 1000 })
            const accountBalance = response.data

            if (response.status <= 299) {  // todo: maybe add alert
                dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: accountBalance})
            }

            if (handleTopUpChange) {
                handleTopUpChange(accountBalance)
            }

            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.error(err)
        }
    }

    return (
        <>
            {isLoading ? <Loader /> : (
                <button
                    className={`top-up-account-button btn btn-sm btn-success ${additionalClass}`}
                    onClick={topUpAccount}
                    disabled={disabled}
                >
                    Doładuj
                </button>

            )}
        </>
    );
};

export default TopUpAccountButton;