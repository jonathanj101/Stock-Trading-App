import React from 'react';
import { Jumbotron, Container, Carousel, Image, Card } from 'react-bootstrap';
import tabletStocksData from '../assets/images/tablet-display-stocks.jpg';
import bitcoinBenjamin from '../assets/images/bitcoin-benjamin.jpg';
import laptopDisplayStock from '../assets/images/laptop-display-stocks.jpg';
import LogInModal from '../components/LogInModal';
import LogInComponent from '../components/LogInComponent';

const Home = () => {
    return (
        <div style={styles.homeDiv} className="w-100 h-100 m-0 p-0 ">
            <div className="text-center w-100">
                <h3>Fantasy Trading Stock App</h3>
                <h4>Personalized To Your Needs</h4>
                <p>To start trading, go ahead and register!</p>
            </div>
            <div className="w-100 m-0 p-0 d-flex align-items-center">
                <Container className="w-100 m-0 p-0">
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
                <LogInComponent />
            </div>
        </div>
    );
};

var styles = {
    jumbotronStyle: {
        // margin: '0 auto 15% auto',
        padding: '0',
        margin: '0',
        minHeight: '30vh',
    },
    homeDiv: {
        // backgroundColor: 'black',
    },
};

export default Home;
