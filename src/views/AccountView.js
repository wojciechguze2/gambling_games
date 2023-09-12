import React, { useEffect, useState } from 'react'
import axios from '../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'
import TopUpAccountButton from '../components/TopUpAccountButton'

const AccountView = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    async function getUser() {
        const url = '/api/user'
        const response = await axios.get(url)

        if (response.status <= 299 && response.data) {
            setUser(response.data)
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        getUser()
    }, []);

    const getHistoryResultMessage = (historyElement) => {
        return historyElement.costBaseValue === historyElement.winBaseValue ? 'Brak zmian' : (
            historyElement.costBaseValue > historyElement.winBaseValue ? 'Strata' : 'Zysk'
        )
    }

    const getHistoryResultClass = (historyElement) => {
        return historyElement.costBaseValue === historyElement.winBaseValue ? 'info' : (
            historyElement.costBaseValue > historyElement.winBaseValue ? 'danger' : 'success'
        )
    }

    const handleTopUpChange = (accountBalance) => {
        setUser((prevUser) => ({
            ...prevUser,
            accountBalance: accountBalance,
        }));
    }

    return (
        <div className="account container my-5">
            {user &&
                <div className="card m-auto">
                    <div className="card-header">
                        <h5 className="card-title">
                            Dane użytkownika: {user.username}
                        </h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            ID użytkownika: {user.id}
                        </p>
                        <p className="card-text">
                            Nazwa użytkownika: {user.username}
                        </p>
                        <p className="card-text d-inline-block">
                            Stan konta: <span className="fw-bold">{user.accountBalance} <span className="text-warning">EuroDachshund</span></span>
                        </p>
                        <TopUpAccountButton handleTopUpChange={handleTopUpChange} additionalClass={"ms-1"} />
                        <p className="card-text">
                            Data utworzenia: {new Date(user.createdAt).toLocaleString()}
                        </p>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th colSpan={7}>
                                        Ostatnie gry
                                    </th>
                                </tr>
                                <tr>
                                    <th>ID rozegranej gry</th>
                                    <th>Gra</th>
                                    <th>Data gry</th>
                                    <th>Koszt (EuroDachshund)</th>
                                    <th>Wygrana</th>
                                    <th>Mnożnik</th>
                                    <th>Wynik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.GameHistories.map(history => (
                                    <tr key={history.id}>
                                        <td>{history.id}</td>
                                        <td>{history.Game.name}</td>
                                        <td>{new Date(history.playDate).toLocaleString()}</td>
                                        <td>{history.costBaseValue * history.gameMultiplier}</td>
                                        <td>{history.winBaseValue * history.gameMultiplier} <span className="text-warning">{history.Currency.name}</span></td>
                                        <td>x{history.gameMultiplier}</td>
                                        <td className={`fw-bold text-${getHistoryResultClass(history)}`}>
                                            {getHistoryResultMessage(history)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default AccountView
