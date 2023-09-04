import WheelOfFortune from "./WheelOfFortune"

const HomepageSpecial = () => {
    return (
        <div className="homepage-special">
            <WheelOfFortune
                containerClass={'m-auto d-inline-flex bg-dark my-5'}
                contentClass={'custom-bg-primary shadow-lg fs-6 fw-bold border border-light border-2'}
                winChoiceClass={'text-warning blink-text fw-bolder'}
                winIndicatorClass={'active'}
            />
        </div>
    )
}

export default HomepageSpecial
