import React from 'react'
import { GITHUB_LINK } from '../utils/constants'

const AboutView = () => {
    return (
        <div className="about">
            <div className="container py-5 text-center">
                <h3>O stronie</h3>
                <div className="fs-5 mt-3">
                    <p className="mb-3">EuroDachshund - na stronie można znaleźć proste gry losowe.</p>
                    <table className="table table-dark table-bordered m-auto">
                        <thead>
                        <tr>
                            <th colSpan={2}>
                                Wykorzystane technologie
                            </th>
                        </tr>
                        <tr className="fs-5">
                            <th>
                                Frontend
                            </th>
                            <th>
                                Backend
                            </th>
                        </tr>
                        </thead>
                        <tbody className="fs-6">
                        <tr>
                            <td>
                                React.js, Redux
                            </td>
                            <td>
                                Node.js - Express
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Bootstrap
                            </td>
                            <td>
                                SQLite
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="mt-3">Jest to moja pierwsza styczność z technologiami React.js oraz Node.js.</p>
                    <p>Więcej projektów na moim <a href={GITHUB_LINK}>GitHubie</a>.</p>
                    <img src="/logo512.webp" alt="Dachshund" className="max-vw-80"></img>
                </div>
            </div>
        </div>
    );
};

export default AboutView
