import React from 'react';
import { Button } from "react-bootstrap";

const ProductCard = ({ product, handleShow }) => (
    <div className="col-md-3 mb-4">
        <div className="card">
            <img
                src={
                    product.image
                        ? `data:image/jpeg;base64,${product.image}`
                        : '/path/to/default-image.jpg'
                }
                className="card-img-top"
                alt={product.name}
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <Button variant="primary" onClick={() => handleShow(product)}>
                    View Details
                </Button>
            </div>
        </div>
    </div>
);

export default ProductCard;
