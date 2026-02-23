import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../services/apiService';
import ProductCard from './ProductCard';
import '../styles/ProductListing.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products. Please try again later.');
      toast.error('Failed to load products!', {
        position: 'bottom-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      setDeletingId(productId);
      await apiService.deleteProduct(productId);
      
      // Remove product from UI
      setProducts(products.filter(p => p.id !== productId));
      
      toast.success('Product deleted successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Failed to delete product: ${err.message}`, {
        position: 'bottom-right',
        autoClose: 5000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleRetry = () => {
    fetchProducts();
  };

  // Loading State
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="text-muted">Loading products...</p>
        </div>
      </Container>
    );
  }

  // Error State
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="mb-4">
          <Alert.Heading>Error Loading Products</Alert.Heading>
          <p>{error}</p>
          <hr />
          <button 
            className="btn btn-primary"
            onClick={handleRetry}
          >
            🔄 Retry
          </button>
        </Alert>
      </Container>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info" className="text-center">
          <h5>No Products Available</h5>
          <p>There are currently no products to display.</p>
          <button 
            className="btn btn-primary"
            onClick={handleRetry}
          >
            🔄 Refresh
          </button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="product-listing-container py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">E-Commerce Products</h1>
          <p className="text-muted">
            Total Products: <strong>{products.length}</strong>
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
            <ProductCard 
              product={product}
              onDelete={handleDelete}
              isDeleting={deletingId === product.id}
            />
          </Col>
        ))}
      </Row>

      {/* Floating Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default ProductListing;
