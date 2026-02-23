import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_TIMEOUT = process.env.REACT_APP_API_TIMEOUT || 10000;

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: parseInt(API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler helper
const handleError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error Response:', error.response.data);
    throw new Error(error.response.data.message || `Error: ${error.response.status}`);
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server:', error.request);
    throw new Error('No response from server. Please check your internet connection.');
  } else {
    // Error in request setup
    console.error('Request Error:', error.message);
    throw new Error(error.message);
  }
};

// API Service Object
const apiService = {
  // Fetch all products
  getProducts: async () => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Fetch product prices (optional separate API)
  getProductPrices: async () => {
    try {
      const response = await axiosInstance.get('/products/prices');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Delete a product by ID
  deleteProduct: async (productId) => {
    try {
      const response = await axiosInstance.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get product by ID (optional)
  getProductById: async (productId) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

export default apiService;
