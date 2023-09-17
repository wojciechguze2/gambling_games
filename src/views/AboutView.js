import React from 'react'
import { GITHUB_LINK } from '../utils/constants'

const AboutView = () => {
    return (
        <div className="about">
            <div className="container py-5">
                <h3>O stronie</h3>
                <div className="lead mt-4 fs-4">
                    Wykorzystane technologie:
                    <ul className="mt-2 mb-4 fs-5">
                        <li>
                            Frontend:
                            <ul>
                                <li>
                                    React.js, Redux
                                </li>
                                <li>
                                    Bootstrap
                                </li>
                            </ul>
                        </li>
                        <li>
                            Backend:
                            <ul>
                                <li>
                                    Node.js - Express
                                </li>
                                <li>
                                    SQLite
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="fs-5">
                    <p>EuroDachshund - na stronie można znaleźć proste gry losowe.</p>
                    <p>Jest to moja pierwsza styczność z technologiami React.js oraz Node.js.</p>
                    <p>Więcej projektów na moim <a href={GITHUB_LINK}>GitHubie</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutView
