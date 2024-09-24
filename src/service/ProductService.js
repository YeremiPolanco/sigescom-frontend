import axios from "axios";

const PRODUCT_BASE_REST_API_URL = "http://localhost:8080/api/product";

class ProductService {
    static getToken() {
        return localStorage.getItem("authToken");
    }

    static getProducts(page = 0, size = 18) {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.get(`${PRODUCT_BASE_REST_API_URL}?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static getProductById(id) {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.get(`${PRODUCT_BASE_REST_API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static createProduct(product) {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.post(PRODUCT_BASE_REST_API_URL, product, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    static updateProduct(id, product) {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.put(`${PRODUCT_BASE_REST_API_URL}/${id}`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    static deleteProduct(id) {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.delete(`${PRODUCT_BASE_REST_API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static getProductsWithLowStock() {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.get(`${PRODUCT_BASE_REST_API_URL}/low-stock`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static getEnabledProducts() {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.get(`${PRODUCT_BASE_REST_API_URL}/enable`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static getDisabledProducts() {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.get(`${PRODUCT_BASE_REST_API_URL}/disenable`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static getProductsByNameContaining(name) {
        const token = ProductService.getToken(); // Fix: use ProductService instead of this
        return axios.get(`${PRODUCT_BASE_REST_API_URL}/name-containing/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}

export default ProductService;
