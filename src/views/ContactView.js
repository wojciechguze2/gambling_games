import {
    MAIL_LINK,
    GITHUB_LINK,
    LINKEDIN_LINK,
    PHONE_LINK,
} from '../utils/constants'

const ContactView = () => {
    return (
        <div className="contact">
            <div className="text-center fs-5 mt-3 mb-3">
                Kontakt
            </div>
            <div className="container">
                <div className="row col-lg-12">
                    <div className="col-md-6">
                        <a
                            href={LINKEDIN_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary vh-35 w-100 mt-1 d-flex justify-content-center align-items-center"
                        >
                            <div>
                                Linkedin
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a
                            href={GITHUB_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary vh-35 w-100 mt-1 d-flex justify-content-center align-items-center"
                        >
                            GitHub
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a
                            href={MAIL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-danger vh-35 w-100 mt-1 d-flex justify-content-center align-items-center"
                        >
                            E-mail
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a
                            href={PHONE_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-warning vh-35 w-100 mt-1 mb-2 d-flex justify-content-center align-items-center"
                        >
                            Phone call
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactView
