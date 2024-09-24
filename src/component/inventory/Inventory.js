import React, { useEffect, useState } from "react";
import ProductService from "../../service/ProductService";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2'; // Importar SweetAlert2

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    useEffect(() => {
        fetchProducts();
    }, [filterType]);

    const fetchProducts = () => {
        setLoading(true);
        setError(null);

        const fetcher = {
            all: ProductService.getProducts,
            enabled: ProductService.getEnabledProducts,
            disabled: ProductService.getDisabledProducts,
            lowStock: ProductService.getProductsWithLowStock,
        }[filterType];

        fetcher()
            .then((response) => {
                const productData = response.data.content || response.data;
                setProducts(productData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShow = (product) => {
        setSelectedProduct(product);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedProduct(null);
    };

    const handleDelete = (productId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                ProductService.deleteProduct(productId)
                    .then(() => {
                        setProducts(products.filter((product) => product.id !== productId));
                        handleClose();
                        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
                    })
                    .catch((err) => {
                        setError(err.message);
                    });
            }
        });
    };

    const handleEdit = (id, updatedProduct) => {
        ProductService.updateProduct(id, updatedProduct)
            .then(() => {
                setProducts(products.map((product) =>
                    product.id === id ? updatedProduct : product
                ));
                handleClose();
                Swal.fire("Guardado", "El producto ha sido actualizado.", "success");
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleLowStock = () => setFilterType("lowStock");
    const handleEnabled = () => setFilterType("enabled");
    const handleDisabled = () => setFilterType("disabled");
    const handleResetFilters = () => {
        setSearchTerm("");
        setFilterType("all");
        fetchProducts();
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div className="main-content">
            <div className="inventory-search-bar">
                <Form className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Search for a product"
                        className="me-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-danger" onClick={handleResetFilters}>
                        Clear Filters
                    </Button>
                </Form>
            </div>

            <div className="inventory-filter-buttons">
                <Button variant="success" className="me-2" onClick={handleEnabled}>
                    Activos
                </Button>
                <Button variant="danger" className="me-2" onClick={handleDisabled}>
                    Inactivos
                </Button>
                <Button variant="warning" onClick={handleLowStock}>
                    Umbral
                </Button>
            </div>

            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} handleShow={handleShow} />
                    ))
                ) : (
                    <h5>No products found</h5>
                )}
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    show={show}
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit} // Prop para manejar edición
                />
            )}
        </div>
    );
};

export default Inventory;
