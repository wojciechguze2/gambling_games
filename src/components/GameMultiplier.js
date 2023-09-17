import React, { useRef } from 'react'

const GameMultiplier = ({ disabled, handleGameMultiplierChange, currentMultiplier, availableMultipliers }) => {
    const dropdownMenuRef = useRef(null)

    const changeMultiplier = (newValue) => {
        if (dropdownMenuRef.current) {
            dropdownMenuRef.current.classList.remove('show')
        }

        if (disabled || !availableMultipliers.includes(newValue) || newValue === currentMultiplier) {
            return false
        }

        if (handleGameMultiplierChange) {
            handleGameMultiplierChange(newValue)
        }
    }

    if (!availableMultipliers || availableMultipliers.length <= 1) {
        return <></>
    }

    return (
        <div className="dropdown d-inline-block mx-2">
            <button
                className="btn btn-info custom-bg-info dropdown-toggle"
                id="game-multiplier-dropdown"
                type="button"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={disabled}
            >
                x{currentMultiplier}
            </button>
            <ul className="dropdown-menu" aria-labelledby="game-multiplier-dropdown" ref={dropdownMenuRef}>
                {availableMultipliers.map((multiplier, index) => (
                    <li key={index}>
                        <a
                            className="dropdown-item"
                            role="button"
                            onClick={() => changeMultiplier(multiplier)}
                            data-value={multiplier}
                        >
                            x{multiplier}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameMultiplier