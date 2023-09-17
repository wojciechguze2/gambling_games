import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER_ACCOUNT_BALANCE } from '../types/authTypes'
import Loader from "./Loader";
import {getAccountBalance} from "../service/user";

const AccountBalance = ({ disabled }) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)

    if (!user) {
        return <></>
    }

    const refreshAccountBalance = async () => {
        if (disabled) {
            return
        }

        setLoading(true)

        try {
            const response = await getAccountBalance()

            if (response.status <= 299) {
                dispatch({type: SET_USER_ACCOUNT_BALANCE, payload: response.data})
            }
        } catch (err) {
            console.error(err)
        }

        setLoading(false)
    }

    return (
        <div>
            {user.accountBalance !== null ? (
                <>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <p className="mb-0 d-inline-block">
                            Stan konta: <span className="fw-bold">{user.accountBalance} <span className="text-warning">EuroDachshund</span></span>
                        </p>
                        {/*
                            <button
                                type="button"
                                role="button"
                                className="btn btn-sm btn-info mt-0 mx-1 p-0 px-1"
                                onClick={refreshAccountBalance}
                                disabled={disabled || isLoading}
                            >
                                Odśwież
                            </button>
                        */}
                    </>
                    )
                }
                </>
            ) : (
                <p>Ładowanie stanu konta...</p>
            )}
        </div>
    );
};

export default AccountBalance;