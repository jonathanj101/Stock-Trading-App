import React from 'react';
import { Jumbotron, Container, Carousel, Image, Card } from 'react-bootstrap';
import tabletStocksData from '../assets/images/tablet-display-stocks.jpg';
import bitcoinBenjamin from '../assets/images/bitcoin-benjamin.jpg';
import laptopDisplayStock from '../assets/images/laptop-display-stocks.jpg';

const Home = () => {
    return (
        <div className="bg-primary">
            <Jumbotron style={jumbotronStyle}>
                <Card className="text-center" body>
                    <h3>Fantasy Trading Stock App</h3>
                    <h4>Personalized To Your Needs</h4>
                    <p>To start trading, go ahead and register!</p>
                </Card>
                <Container>
                    <Carousel>
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
            </Jumbotron>
        </div>
    );
};

var jumbotronStyle = {
    margin: '0 auto 15% auto',
    padding: '0',
    minHeight: '30vh',
};

export default Home;
