# API Integration Guide

## Overview
This document provides detailed information about API integration for the E-Commerce Product Screen application.

## API Configuration

### Environment Variables
Configure your API endpoint in the `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000
```

- **REACT_APP_API_URL**: Base URL for all API endpoints
- **REACT_APP_API_TIMEOUT**: Request timeout in milliseconds (default: 10000ms)

## API Service

### Location
`src/services/apiService.js`

### Methods Available

#### 1. getProducts()
Fetches all products from the API.

**Endpoint:** `GET /api/products`

**Response Format:**
```javascript
[
  {
    id: "1",
    name: "Product Name",
    description: "Product Description",
    price: 99.99,
    category: "Category Name",
    imageUrl: "https://example.com/image.jpg"
  },
  ...
]
```

**Usage:**
```javascript
import apiService from '../services/apiService';

const products = await apiService.getProducts();
```

#### 2. getProductPrices()
Fetches product price information (optional).

**Endpoint:** `GET /api/products/prices`

**Response Format:**
```javascript
{
  totalProducts: 10,
  averagePrice: 5000,
  minPrice: 1000,
  maxPrice: 10000,
  prices: [...]
}
```

**Usage:**
```javascript
const prices = await apiService.getProductPrices();
```

#### 3. deleteProduct(productId)
Deletes a product by its ID.

**Endpoint:** `DELETE /api/products/{id}`

**Parameters:**
- `productId` (string|number): The ID of the product to delete

**Response Format:**
```javascript
{
  success: true,
  message: "Product deleted successfully"
}
```

**Usage:**
```javascript
await apiService.deleteProduct("1");
```

#### 4. getProductById(productId)
Fetches a single product by ID (optional).

**Endpoint:** `GET /api/products/{id}`

**Response Format:**
```javascript
{
  id: "1",
  name: "Product Name",
  description: "Product Description",
  price: 99.99,
  category: "Category Name",
  imageUrl: "https://example.com/image.jpg"
}
```

**Usage:**
```javascript
const product = await apiService.getProductById("1");
```

## Error Handling

The apiService automatically handles errors and throws meaningful error messages:

```javascript
try {
  const products = await apiService.getProducts();
} catch (error) {
  console.error(error.message);
  // Handle error: "No response from server", "Error: 404", etc.
}
```

### Error Types

| Error | Cause | Resolution |
|-------|-------|-----------|
| "No response from server" | Backend not running or unreachable | Check backend server, verify URL in .env |
| "Error: 404" | Endpoint not found | Verify API endpoint path |
| "Error: 500" | Server error | Check backend logs |
| Timeout error | Request took too long | Increase REACT_APP_API_TIMEOUT or check backend performance |

## Request/Response Flow

### Successful GET Request
```
Frontend (React)
    ↓
apiService.getProducts()
    ↓
Create Axios Instance with config
    ↓
GET http://localhost:3001/api/products
    ↓
Backend API
    ↓
Return 200 OK with product data
    ↓
Parse response
    ↓
Return data to React component
```

### Successful DELETE Request
```
Frontend (React)
    ↓
User clicks Delete button
    ↓
Confirmation dialog
    ↓
apiService.deleteProduct(id)
    ↓
DELETE http://localhost:3001/api/products/{id}
    ↓
Backend API
    ↓
Delete product from database
    ↓
Return 200 OK with success message
    ↓
Remove product from UI
    ↓
Show success toast
```

## Backend API Requirements

Your backend API should meet these specifications:

### 1. Products Endpoint
```
Method: GET
URL: /api/products
Status: 200 OK
Response: Array of product objects
CORS: Enabled (allow requests from http://localhost:3000)
```

### 2. Delete Product Endpoint
```
Method: DELETE
URL: /api/products/{id}
Status: 200 OK or 204 No Content
Response: {success: true, message: "..."}
CORS: Enabled
Authentication: Optional (can add later)
```

### 3. Expected Headers
```
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, DELETE, POST, PUT
Access-Control-Allow-Headers: Content-Type
```

## Sample Backend Response

### Products List
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "iPhone 15 Pro",
      "description": "Latest Apple smartphone",
      "price": 129999,
      "category": "Mobiles",
      "imageUrl": "https://cdn.example.com/iphone-15.jpg"
    },
    {
      "id": "2",
      "name": "Samsung Galaxy S24",
      "description": "Premium Android phone",
      "price": 124999,
      "category": "Mobiles",
      "imageUrl": "https://cdn.example.com/s24.jpg"
    }
  ]
}
```

### Delete Response
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "deletedId": "1"
}
```

## Testing the API Integration

### Using Mock Data
Modify `apiService.js` for development:

```javascript
const apiService = {
  getProducts: async () => {
    // Return mock data for testing
    return [
      {
        id: "1",
        name: "Test Product",
        description: "Test Description",
        price: 9999,
        category: "Test",
        imageUrl: "https://via.placeholder.com/250"
      }
    ];
  },
  // ... other methods
};
```

### Using Real Backend
1. Ensure backend is running on the configured URL
2. Update `.env` with correct backend URL
3. Run `npm start`
4. Check browser console for API calls
5. Use DevTools Network tab to inspect requests/responses

### Using Postman
Test endpoints directly:

```
GET http://localhost:3001/api/products
DELETE http://localhost:3001/api/products/1
```

## Troubleshooting

### CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Enable CORS on backend:
```javascript
// Express example
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'DELETE', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type']
}));
```

### 404 Not Found
**Error:** `Error: 404`

**Solution:**
- Verify API endpoint path matches backend routes
- Check if backend is using `/api/products` or different path
- Update `REACT_APP_API_URL` if needed

### Timeout Error
**Error:** Request times out

**Solution:**
- Increase `REACT_APP_API_TIMEOUT` in .env
- Check backend performance
- Verify network connection

### No Response Error
**Error:** `No response from server`

**Solution:**
- Start backend server
- Verify backend URL in .env
- Check if firewall blocks requests
- Check backend logs for detailed errors

## Advanced Configuration

### Custom Headers
Edit `src/services/apiService.js`:

```javascript
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: parseInt(API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Add auth token
  },
});
```

### Request Interceptor
```javascript
axiosInstance.interceptors.request.use(
  config => {
    console.log('Request:', config);
    return config;
  }
);
```

### Response Interceptor
```javascript
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Response error:', error);
    // Custom error handling
    throw error;
  }
);
```

## Performance Optimization

### Caching
Consider implementing caching for products:

```javascript
let cachedProducts = null;

const getProducts = async () => {
  if (cachedProducts) {
    return cachedProducts;
  }
  cachedProducts = await axiosInstance.get('/products');
  return cachedProducts;
};
```

### Request Debouncing
Limit rapid API calls:

```javascript
import { debounce } from '../utils/helpers';

const debouncedFetch = debounce(fetchProducts, 500);
```

## Rate Limiting

If backend implements rate limiting, handle it:

```javascript
if (error.response?.status === 429) {
  console.error('Rate limit exceeded');
  // Wait before retrying
}
```

---

For more information, refer to the [README.md](./README.md) file.
