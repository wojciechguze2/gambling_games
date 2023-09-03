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
                                Section 2
                            </p>
                            <ul className="list-unstyled fs-5">
                                <li>
                                    Section 2 el
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 text-center footer-end">
                            <p className="footer-section-header fs-3">
                                Section 3
                            </p>
                            <ul className="list-unstyled fs-5">
                                <li>
                                    Section 3 el
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center p-3 pb-0">
                <a
                    href="/LINKEDIN_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-4"
                    aria-label="Linkedin account"
                >
                    Linkedin
                </a>
                <a
                    href="/GITHUB_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-4"
                    aria-label="GitHub account"
                >
                    GitHub
                </a>
                <a
                    href="/MAIL_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-4"
                    aria-label="Send me an e-mail"
                >
                    Mail
                </a>
                <a
                    href="/PHONE_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-4"
                    aria-label="Call me"
                >
                    Phone
                </a>
            </div>
            <div className="d-flex justify-content-end align-items-center px-3">
                <p className="me-4">Wojciech Guze - 09.2023</p>
            </div>
        </footer>
    )
}

export default MainFooter