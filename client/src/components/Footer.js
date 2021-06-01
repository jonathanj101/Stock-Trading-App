import React from 'react';

const Footer = () => {
    return (
        <div
            className="bg-dark"
            style={{ fontSize: '1.5rem', minHeight: '70vh' }}
        >
            <div
                id="user-info-container"
                className="w-50 mx-auto text-center text-white"
            >
                <div>
                    <p className="fs-1">@Jonathan J || Full Stack Developer</p>
                </div>
                <div>
                    <a
                        className="lindkedIn_div"
                        href="https://www.linkedin.com/in/jonathan-jimenez101/"
                    >
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
