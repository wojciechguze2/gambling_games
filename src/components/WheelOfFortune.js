import React, {Component} from "react";
import '../styles/wheel-of-fortune.scss';

class WheelOfFortune extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null,
            isSpinning: false,
            gameId: 1
        };
    }

    async componentDidMount() {
        const choices = await this.getChoicesData(this.state.gameId);
        this.setState({ choices });
    }

    getChoicesData = async (gameId) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/games/${gameId}`
        const response = await fetch(url);

        const gameData = await response.json();
        const choices = gameData['GameValues']

        let currentAngle = 0;

        return choices.map((choice, index) => {
            const rotate = `rotate(${currentAngle}deg)`;
            currentAngle += 360 / choices.length;

            return (
                <div
                    key={index}
                    className="wheel-of-fortune--choice"
                    style={{ transform: rotate, backgroundColor: 'red' }} // todo: choice.color
                >
                    {choice.value} {choice.Currency.name}
                </div>
            );
        });
    };

    getRandomGameResult = async (gameId) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/games/${gameId}/result`
        const response = await fetch(url);

        return await response.json();
    };

    spinWheel = async () => {
        this.setState({ isSpinning: true });

        try {
            const result = await this.getRandomGameResult(this.state.gameId);

            setTimeout(() => {
                this.setState({ result: result, isSpinning: false });
            }, 10000) // todo: fix animation and add result info
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { containerClass, contentClass } = this.props;
        const { choices, isSpinning } = this.state;

        return (
            <div>
                <div className={`wheel-of-fortune ${containerClass}`}>
                    <div className={`wheel-of-fortune--content ${isSpinning ? 'spin' : ''} ${contentClass}`}>
                        {choices}
                    </div>
                </div>
                <div className="mt-auto mb-5">
                    <button
                        className="btn btn-warning btn-lg w-50 text-dark"
                        onClick={this.spinWheel}
                    >
                        Zagraj
                    </button>
                </div>
            </div>
        );
    }
}

export default WheelOfFortune;
