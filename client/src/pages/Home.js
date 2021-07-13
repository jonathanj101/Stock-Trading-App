import React from 'react';
import { Container, Carousel, Image } from 'react-bootstrap';
import tabletStocksData from '../assets/images/tablet-display-stocks.jpg';
import bitcoinBenjamin from '../assets/images/bitcoin-benjamin.jpg';
import laptopDisplayStock from '../assets/images/laptop-display-stocks.jpg';
import LogInComponent from '../components/User-Auth/LogIn/LogInComponent';

const Home = ({ handleLogIn, isLogged }) => {
    return (
        <div className="w-100 h-100 mb-5">
            <div
                id="app-description-container"
                className="text-center w-100"
                style={{ fontSize: '1.5rem' }}
            >
                <span id="app-title">Fantasy Trading Stock App</span>
                <br />
                <span id="app-description">
                    Uses IEX Cloud to pull Stock Market data
                </span>
                <br />
                <span id="app-description">
                    To start trading, go ahead and register!
                </span>
            </div>
            <div className="d-flex align-items-center">
                <Container className="w-100 m-0 p-0 mx-auto">
                    <Carousel className="w-100">
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={tabletStocksData}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={bitcoinBenjamin}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={laptopDisplayStock}
                            />
                        </Carousel.Item>
                    </Carousel>
                </Container>
                {isLogged ? (
                    <div></div>
                ) : (
                    <LogInComponent handleLogIn={handleLogIn} />
                )}
            </div>
        </div>
    );
};

export default Home;
