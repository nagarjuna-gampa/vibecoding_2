import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onDelete, isDeleting }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      onDelete(product.id);
    }
  };

  return (
    <Card className="product-card h-100 shadow-sm">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={product.imageUrl} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/250?text=No+Image';
          }}
        />
      </div>
      <Card.Body>
        <div className="mb-2">
          <Badge bg="primary" className="me-2">
            {product.category}
          </Badge>
        </div>
        <Card.Title className="product-name">{product.name}</Card.Title>
        <Card.Text className="product-description text-muted">
          {product.description}
        </Card.Text>
        <div className="product-price-section">
          <h5 className="product-price">
            ₹{product.price.toLocaleString('en-IN')}
          </h5>
        </div>
      </Card.Body>
      <Card.Footer className="border-top">
        <Button 
          variant="danger" 
          size="sm" 
          className="w-100"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : '🗑 Delete'}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
