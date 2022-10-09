import React from "react";

import { Card, Button } from 'react-bootstrap';

const DEFAULT_IMAGE = require('../assets/images/pet_finder_logo.png');

const Pet = ({ pet }) => {

    const getImageUrl = () => {
        if (pet.photos.length === 0) {
            return DEFAULT_IMAGE;
        } else {
            let firstImage = pet.photos[0];

            if (firstImage.full) {
                return firstImage.full;
            } else {
                return Object.values(firstImage)[0];
            }
        }
    }

    return (
        <Card className="card-container scale-transition">
            <div className="image-cover">
                <Card.Img variant="top" src={getImageUrl()} />
            </div>

            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                    {pet.age}
                    <br />
                    {pet.breeds?.primary}
                    <br />
                    {pet.gender}
                </Card.Text>
                <Button variant="primary" className="bg-primary zoom-in-transition box-shadow">Adopt me 🥺</Button>
            </Card.Body>
        </Card>
    )
}

export default Pet;