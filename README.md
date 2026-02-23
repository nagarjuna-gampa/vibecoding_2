# E-Commerce Product Screen - ReactJS Frontend

A modern, responsive ReactJS E-Commerce Product Screen that displays products, prices, and allows deleting products through REST API integration.

## 🎯 Features

✅ **Product Listing** - Fetch and display products from API  
✅ **Product Information** - Display product image, name, description, category, and price  
✅ **Delete Functionality** - Remove products with confirmation dialog  
✅ **Error Handling** - Graceful error messages and retry functionality  
✅ **Loading States** - Spinner while fetching data  
✅ **Toast Notifications** - Success/error messages for user actions  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Environment Configuration** - Easy API URL configuration via .env  

## 🛠️ Technology Stack

- **React 18.2** - UI Library with Hooks
- **Axios** - API HTTP client
- **React Bootstrap** - UI Component Library
- **React Toastify** - Toast notifications
- **React Router DOM** - Routing (optional)
- **Bootstrap 5** - CSS Framework
- **CSS3** - Custom styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- A running backend API server (see API Requirements)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-product-screen
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000
```

Update `REACT_APP_API_URL` to match your backend server URL.

### 4. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
```

## 📡 API Requirements

The backend should provide the following endpoints:

### Get All Products
```
GET /api/products
Response:
[
  {
    "id": "101",
    "name": "iPhone 15",
    "description": "Latest Apple iPhone",
    "price": 79999,
    "category": "Mobiles",
    "imageUrl": "https://..."
  },
  ...
]
```

### Delete Product
```
DELETE /api/products/{id}
Response:
{
  "message": "Product deleted successfully",
  "success": true
}
```

### Get Product Prices (Optional)
```
GET /api/products/prices
Response:
{
  "totalProducts": 10,
  "averagePrice": 45000,
  "prices": [...]
}
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ProductListing.js      # Main product list component
│   └── ProductCard.js         # Individual product card
├── services/
│   └── apiService.js          # API communication layer
├── styles/
│   ├── App.css               # Global styles
│   ├── ProductCard.css       # Product card styles
│   └── ProductListing.css    # Product listing styles
├── App.js                     # Main app component
└── index.js                   # React entry point

public/
└── index.html                 # HTML template
```

## 🎨 UI Components

### ProductListing Component
- Fetches products from API
- Displays products in a responsive grid
- Handles loading and error states
- Shows empty state when no products

### ProductCard Component
- Displays individual product details
- Product image with fallback
- Price formatting (Indian Rupee)
- Category badge
- Delete button with confirmation
- Hover effects and animations

## 🔄 User Actions

### 1. View Products
- Page loads and fetches products automatically
- Shows loading spinner during fetch
- Displays error message if API fails
- Products shown in a responsive grid

### 2. Delete Product
- Click the "Delete" button on a product card
- Confirmation dialog appears
- On confirmation, DELETE API is called
- Product removed from UI on success
- Toast notification shows success/error message

## 🛡️ Error Handling

- **Network Errors** - Shows error message and retry button
- **API Errors** - Displays server error messages
- **Timeout Errors** - Alerts user if API takes too long
- **Invalid Response** - Handles malformed API responses
- **Missing Images** - Shows placeholder for missing product images

## 🎯 Loading & State Management

Uses React Hooks:
- `useState` - Manage products, loading, error states
- `useEffect` - Fetch products on component mount
- Local state for deletion action

## 📱 Responsive Design

- **Desktop** - Multi-column grid (4 columns)
- **Tablet** - 3 columns on large screens, 2 columns on medium
- **Mobile** - Single column on small screens
- Touch-friendly delete buttons
- Optimized spacing and typography

## 🚦 Toast Notifications

- **Success** - Product deleted successfully
- **Error** - Failed to delete product
- Position: Bottom right
- Auto-close after 5 seconds
- Dismissible by clicking

## 🔐 Security Considerations

- Environment variables for API configuration
- Error messages don't expose sensitive info
- Confirmation dialog before deletion
- Request timeout to prevent hanging requests

## 🧪 Testing the Application

### With Mock Data
1. Update `.env` to point to a mock API
2. Or modify `apiService.js` to return mock data in development

### With Real Backend
1. Start your backend server
2. Update `.env` to match backend URL
3. Run `npm start`

## 📝 Sample Mock API Response

```json
[
  {
    "id": "1",
    "name": "Samsung Galaxy S24",
    "description": "Latest Android smartphone with advanced features",
    "price": 79999,
    "category": "Mobiles",
    "imageUrl": "https://via.placeholder.com/250?text=Galaxy+S24"
  },
  {
    "id": "2",
    "name": "iPad Pro 12.9",
    "description": "Powerful tablet for professionals",
    "price": 99999,
    "category": "Tablets",
    "imageUrl": "https://via.placeholder.com/250?text=iPad+Pro"
  },
  {
    "id": "3",
    "name": "MacBook Pro",
    "description": "High-performance laptop for developers",
    "price": 199999,
    "category": "Laptops",
    "imageUrl": "https://via.placeholder.com/250?text=MacBook+Pro"
  }
]
```

## 🔧 Customization

### Change Theme Colors
Edit `src/styles/App.css` and color variables

### Modify Grid Layout
Update `ProductListing.js` Bootstrap grid sizes (Col xs, sm, lg, xl)

### Add More Features
- Product filtering
- Search functionality
- Pagination
- Product detail page
- Shopping cart integration

## 🚨 Troubleshooting

### API Connection Issues
- Verify backend server is running
- Check `REACT_APP_API_URL` in `.env`
- Check CORS settings on backend
- Verify API port is correct

### Products Not Loading
- Check browser console for error messages
- Verify API response format matches expected structure
- Check network requests in DevTools
- Ensure backend is returning data

### Styling Issues
- Clear browser cache
- Restart development server: `npm start`
- Check if Bootstrap CSS is loaded
- Verify no CSS conflicts

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.0",
  "axios": "^1.4.0",
  "bootstrap": "^5.3.0",
  "react-bootstrap": "^2.8.0",
  "react-toastify": "^9.1.3"
}
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements.

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🚀**
