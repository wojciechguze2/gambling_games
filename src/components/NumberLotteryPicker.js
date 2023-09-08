import { useEffect, useState } from 'react'

const NumberLotteryPicker = (props) => {
    const {
        availableNumbersCount,
        selectedNumbers,
        isLotteryRunning,
        handleNumberClick,
        resultNumbers,
        resultCurrencyName,
        gameMultiplierValue
    } = props

    const getAvailableNumbers = () => {
        return Array.from({ length: availableNumbersCount }, (_, index) => index + 1)
    }

    const isSelectedNumber = (selectedNumbers, number) => {
        return selectedNumbers.includes(number)
    }

    const isAvailableNumber = (availableNumbers, number) => {
        return availableNumbers.includes(number)
    }

    const isResultNumber = (availableNumbers, resultNumbers, number) => {
        return (
            resultNumbers
            && resultNumbers.some(result => result.number === number)
            && (!availableNumbers || isAvailableNumber(availableNumbers, number))
        )
    }

    const numbers = getAvailableNumbers()
    const [isSelectNumbersHidden, hideSelectNumbers] = useState(false)
    const [isResultNumbersVisible, showResultNumbers] = useState(false)
    const [isResultSelectedNumbersMarked, markResultSelectedNumbers] = useState(false)

    useEffect(() => {
        if (isLotteryRunning && resultNumbers) {
            hideSelectNumbers(true)
            setTimeout(() => {
                showResultNumbers(true)

                setTimeout(() => {
                    markResultSelectedNumbers(true)
                }, 1500)
            }, 1000)
        } else {
            hideSelectNumbers(false)
            showResultNumbers(false)
        }
    }, [isLotteryRunning, resultNumbers])

    return (
        <div className="number-lottery-picker">
            <div className="number-lottery-picker--selected-numbers--container d-flex">
                <div className="m-auto max-circle-width selected-numbers">
                    {selectedNumbers.map((number) => (
                        <div
                            key={number}
                            className={`selected-number circle circle-sm d-inline-flex ${isResultSelectedNumbersMarked && isResultNumber(numbers, resultNumbers, number) ? 'bg-warning' : 'custom-bg-info'}`}
                        >
                            {number}
                        </div>
                    ))}
                </div>
            </div>
            <div className="number-lottery-picker--select-numbers--container d-flex">
                <div className={`m-auto select-numbers ${isSelectNumbersHidden ? 'hidden' : ''} ${isResultNumbersVisible ? 'd-none' : ''}`}>
                    {
                        numbers.map((number) => (
                            <div
                                key={number}
                                className={
                                `select-number d-inline-flex circle circle-sm ${isSelectedNumber(selectedNumbers, number) ? 'custom-bg-info' : 'custom-bg-primary'}`}
                                onClick={() => handleNumberClick(number)}
                            >
                                {number}
                            </div>
                        ))
                    }
                </div>
                {isResultNumbersVisible && resultNumbers && (
                    <div className="m-auto result-numbers show">
                        {
                            resultNumbers.map((number) => (
                                <div
                                    key={number.number}
                                    className={`result-number d-inline-flex circle circle-md bg-warning ${isResultSelectedNumbersMarked && isSelectedNumber(selectedNumbers, number.number) ? 'blink-text' : ''}`}
                                >
                                    <span className="result-number--number">{number.number}</span>
                                    <span className="result-number--value text-success">{number.value * gameMultiplierValue}</span>
                                    <span className="result-number--currency text-success">{resultCurrencyName}</span>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default NumberLotteryPicker