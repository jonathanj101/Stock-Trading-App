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
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={bitcoinBenjamin}
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>
                                    Nulla vitae elit libero, a pharetra augue
                                    mollis interdum.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={laptopDisplayStock}
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel
                                    scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
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
