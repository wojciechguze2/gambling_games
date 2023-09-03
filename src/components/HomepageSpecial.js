import WheelOfFortune from "./WheelOfFortune"

const HomepageSpecial = () => {
    return (
        <div className="homepage-special">
            <WheelOfFortune
                containerClass={'m-auto d-inline-flex bg-dark my-5'}
                contentClass={'bg-dark'}
            />
        </div>
    )
}

export default HomepageSpecial
