import React from 'react'

const LotteryAlerts = ({ winMessage, costMessage, errorMessage, isDemo, isWin, additionalClass }) => {
    return (
        <div className={`number-lottery-alerts ${additionalClass}`}>
            {winMessage && !isDemo && (
                <div className={`alert alert-${isWin === false ? 'danger' : 'success'}`}>
                    {winMessage}
                </div>
            )}
            {costMessage && !isDemo && (
                <div className="alert alert-warning">
                    {costMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            )}
        </div>
    )
}

export default LotteryAlerts
