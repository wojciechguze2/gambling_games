import '../styles/wheel-of-fortune.scss';

const WheelOfFortune = ({ colorClass }) => {
    const choices = [
        {
            probability: 20,
            text: 'Prawdopodobieństwo 20%',
        },
        {
            probability: 30,
            text: 'Prawdopodobieństwo 30%',
        },
        {
            probability: 20,
            text: 'Prawdopodobieństwo 20%',
        },
        {
            probability: 20,
            text: 'Prawdopodobieństwo 20%',
        },
        {
            probability: 10,
            text: 'Prawdopodobieństwo 10%',
        },
    ];

    const totalProbability = choices.reduce((sum, choice) => sum + choice.probability, 0);

    let currentAngle = 0;

    const choiceElements = choices.map((choice, index) => {
        const angle = (360 * choice.probability) / totalProbability;
        const rotateStyle = { transform: `rotate(${currentAngle}deg)` };
        currentAngle += angle;

        return (
            <div
                key={index}
                className="wheel-of-fortune--choice"
                style={rotateStyle}
                data-probability={choice.probability}
            >
                {choice.text}
            </div>
        );
    });

    return (
        <div className="wheel-of-fortune">
            <div className={`wheel-of-fortune--content ${colorClass}`}>{choiceElements}</div>
        </div>
    );
};

export default WheelOfFortune;
