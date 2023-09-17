import {GITHUB_LINK, LINKEDIN_LINK} from '../utils/constants'

const MainFooter = () => {
    return (
        <footer
            className="footer footer-animation custom-bg-primary text-white text-decoration-none w-100 mt-auto mb-0"
            role="contentinfo"
        >
            <div className="flex-grow-1">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4 text-center footer-start">
                            <p className="footer-section-header fs-3">
                                Informacje
                            </p>
                            <ul className="list-unstyled fs-5">
                                <li>
                                    <a href="/about" className="text-white footer-link">
                                        O stronie
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="text-white footer-link">
                                        Kontakt
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-center footer-middle">
                            <p className="footer-section-header fs-3">
                                Regulaminy
                            </p>
                            <ul className="list-unstyled fs-5">
                                <li>
                                    <a href="/regulations" className="text-white footer-link">
                                        Regulamin
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy-policy" className="text-white footer-link">
                                        Polityka prywatności
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-center footer-end">
                            <p className="footer-section-header fs-3">
                                Więcej
                            </p>
                            <ul className="list-unstyled fs-5">
                                <li>
                                    <a
                                        href={GITHUB_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white footer-link"
                                    >
                                        GitHub
                                    </a>
                                    <a
                                        href={LINKEDIN_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white footer-link"
                                    >
                                        <div>
                                            LinkedIn
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center px-3">
                <a
                    href={LINKEDIN_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-4 text-white text-decoration-none fs-5 fw-bold"
                >
                    <div>
                        Wojciech Guze - 09.2023
                    </div>
                </a>
            </div>
        </footer>
    )
}

export default MainFooter