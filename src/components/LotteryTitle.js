import React from 'react'

const LotteryTitle = ({ title, isLotteryRunning, isWin, jackpotValue, currencyName, additionalClass }) => {
    return (
        <div className={`lottery-title ${additionalClass ? additionalClass : ''}`}>
            {isLotteryRunning ? (
                isWin === null ? (
                    <h5>Rozpoczęto losowanie!</h5>
                ) : (
                    <h5>Losowanie zakończone!</h5>
                )
            ) : (
                <h5>{title}</h5>
            )}
            {jackpotValue && (
                <p className="fs-6">
                    Maksymalna możliwa wygrana: <span className="text-danger fw-bold">{jackpotValue} {currencyName}</span>
                </p>
            )}
        </div>
    )
}

export default LotteryTitle
