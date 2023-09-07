import { useState } from 'react'

const NumberLotteryPicker = ({ requiredSelectedNumbersCount = 6, availableNumbersCount = 50 }) => {
    const [selectedNumbers, setSelectedNumbers] = useState([])

    const selectNumber = (number) => {
        setSelectedNumbers([...selectedNumbers, number])
    }

    const unSelectNumber = (number) => {
        setSelectedNumbers(selectedNumbers.filter((n) => n !== number))
    }

    const getAvailableNumbers = () => {
        return Array.from({ length: availableNumbersCount }, (_, index) => index + 1)
    }

    const handleNumberClick = (number) => {
        const isNumberSelected = selectedNumbers.includes(number)

        if (isNumberSelected) {
            unSelectNumber(number)
        } else if (selectedNumbers.length < requiredSelectedNumbersCount) {
            selectNumber(number)
        } else { // selectedNumbers.length >= requiredSelectedNumbersCount
            // requiredSelectedNumbersCount has been achieved
        }
    }

    const numbers = getAvailableNumbers()

    return (
        <div className="number-lottery-picker">
            <div className="number-lottery-picker--selected-numbers d-flex">
                <div className="m-auto max-circle-width">
                    {selectedNumbers.map((number) => (
                        <div key={number} className="selected-number circle-sm bg-warning d-inline-flex">{number}</div>
                    ))}
                </div>
            </div>
            <div className="number-lottery-picker--select-numbers d-flex">
                <div className="m-auto">
                    {
                        numbers.map((number) => (
                            <div
                                key={+number}
                                className={
                                `select-number d-inline-flex circle-sm ${selectedNumbers.includes(number) ? 'bg-warning' : 'custom-bg-primary'}`}
                                onClick={() => handleNumberClick(number)}
                            >
                                {number}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default NumberLotteryPicker