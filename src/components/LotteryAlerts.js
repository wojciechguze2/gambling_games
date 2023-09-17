import React from 'react'

const LotteryAlerts = ({ winMessage, costMessage, errorMessage, isDemo, isWin, additionalClass }) => {
    return (
        <div className={`number-lottery-alerts ${additionalClass}`}>
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
    )
}

export default LotteryAlerts
