import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {

    return (
        <Container style={{marginTop: 10, marginBottom: 10}}>
            <Row>
                <Col>
                    <img alt="" src={require('../assets/images/pet_finder_logo.png')} className="logo-header" />
                </Col>
            </Row>
        </Container>
    )
}

export default Header;