import React from 'react'

const LotteryTitle = ({ title, isLotteryRunning, isWin, isDemo, jackpotValue, currencyName, additionalClass }) => {
    return (
        <div className={`lottery-title ${additionalClass ? additionalClass : ''}`}>
            {isLotteryRunning ? (
                isWin === null ? (
                    <h4>Rozpoczęto losowanie!</h4>
                ) : (
                    <h4>Losowanie zakończone!</h4>
                )
            ) : (
                <h4>{title}</h4>
            )}
            {jackpotValue && !isDemo && (
                <p className="lottery-title--jackpot">
                    Maksymalna możliwa wygrana: <span className="text-danger fw-bold">{jackpotValue} {currencyName}</span>
                </p>
            )}
        </div>
    )
}

export default LotteryTitle
