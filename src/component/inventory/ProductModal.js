import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProductModal = ({ product, show, handleClose, handleDelete, handleEdit }) => {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    const handleChange = (e) => {
        setUpdatedProduct({
            ...updatedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        handleEdit(product.id, updatedProduct); // Enviamos el ID y el producto actualizado
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={updatedProduct.stock}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                    Delete
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;
