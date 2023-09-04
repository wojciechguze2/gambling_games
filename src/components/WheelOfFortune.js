import React, {Component} from "react";
import '../styles/wheel-of-fortune.scss';

class WheelOfFortune extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: {},
            isFakeSpinning: false,
            isSpinning: false,
            gameId: 1,
            choicesData: [],
            startAngle: 0,
            finalAngle: 0,
            contentAngle: 0,
            circleAngle: 360,
            fakeSpinDelay: 900,
            spinDelay: 4950
        };
    }

    async componentDidMount() {
        await this.setChoicesData(this.state.gameId)

        document.documentElement.style.setProperty('--startAngle', `${this.state.startAngle}deg`);
        document.documentElement.style.setProperty('--finalAngle', `${this.state.finalAngle}deg`);
    }

    setChoicesData = async (gameId) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/games/${gameId}`
        const response = await fetch(url);

        const gameData = await response.json();
        const choicesData = gameData['GameValues']

        this.setState({ choicesData })
    }

    isGamePlayed = () => {
        return (
            !this.state.isSpinning
            && !this.state.isFakeSpinning
            && this.state.result
            && this.state.result.id
        )
    }

    isWinningChoice = (choiceId) => {
        return !this.state.isSpinning && this.state.result && this.state.result.id === choiceId
    }

    getChoices = () => {
        const { winChoiceClass, winChoiceTextAddition } = this.props
        let currentAngle = 0;

        return this.state.choicesData.map((choice, index) => {
            const rotate = `rotate(${currentAngle}deg)`;
            currentAngle += this.state.circleAngle / this.state.choicesData.length;

            return (
                <div
                    key={index}
                    className={`wheel-of-fortune--choice ${this.isWinningChoice(choice.id) ? winChoiceClass : ''}`}
                    style={{ transform: rotate }}
                >
                    {choice.value} {choice.Currency.name} {this.isWinningChoice(choice.id) ? winChoiceTextAddition : ''}
                </div>
            );
        });
    };

    getRandomGameResult = async (gameId) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/games/${gameId}/result`
        const response = await fetch(url);

        return await response.json();
    };

    fakeSpinWheel = async () => {
        this.setState({ isFakeSpinning: true, result: {} });

        await new Promise(resolve => setTimeout(resolve, this.state.fakeSpinDelay));

        await this.spinWheel();
    }

    spinWheel = async () => {
        this.setState({ isFakeSpinning: false, isSpinning: true });

        const result = await this.getRandomGameResult(this.state.gameId);
        const totalChoices = this.state.choicesData.length;
        const resultIndex = this.state.choicesData.findIndex(choice => choice.id === result.id) + 1;

        const finalAngle = (
            this.state.circleAngle * 10 // for prettier animation
            - (this.state.circleAngle / totalChoices) * resultIndex  // it's winning choice angle
            + (this.state.circleAngle / totalChoices)  // it's single choice angle
        );

        this.setState({result, finalAngle})
        document.documentElement.style.setProperty('--startAngle', `0deg`);
        document.documentElement.style.setProperty('--finalAngle', `${finalAngle}deg`);

        await new Promise(resolve => setTimeout(resolve, this.state.spinDelay));

        await this.setWheelResult(finalAngle)
    };

    setWheelResult = async (finalAngle) => {
        this.setState({ contentAngle: finalAngle, isSpinning: false });
        document.documentElement.style.setProperty('--contentAngle', `${finalAngle}deg`);
    }

    render() {
        const { containerClass, contentClass, winIndicatorClass } = this.props;
        const { isSpinning, isFakeSpinning } = this.state;

        return (
            <div>
                <div className="wheel-of-fortune-container">
                    <div
                        className={`wheel-of-fortune-win-indicator my-auto d-inline-flex ${this.isGamePlayed() ? winIndicatorClass : '' }`}
                    />
                    <div className={`wheel-of-fortune ${containerClass}`}>
                        <div
                            className={`wheel-of-fortune--content ${isSpinning ? 'spin' : ''} ${isFakeSpinning ? 'fake-spin' : ''} ${contentClass}`}
                            style={{transform: `rotate(${this.state.contentAngle}deg)`}}
                        >
                            {this.getChoices()}
                        </div>
                    </div>
                </div>
                <div className="mt-auto mb-5">
                    <button
                        className={`btn btn-warning btn-lg w-50 text-dark ${isSpinning || isFakeSpinning ? 'disabled' : ''}`}
                        onClick={this.fakeSpinWheel}
                        disabled={isSpinning}
                    >
                        Zagraj
                    </button>
                </div>
            </div>
        );
    }
}

export default WheelOfFortune;
