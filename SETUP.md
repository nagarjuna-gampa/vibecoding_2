# Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Create/Update `.env` file:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000
```

### Step 3: Start Development Server
```bash
npm start
```

Your app will open at `http://localhost:3000`

---

## 📋 Prerequisites

- **Node.js**: v14 or higher
  - Check: `node --version`
- **npm**: v6 or higher
  - Check: `npm --version`
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Install Node.js

#### Windows
1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer and follow steps
3. Verify: Open PowerShell and run `node --version`

#### macOS
```bash
brew install node
```

#### Linux
```bash
sudo apt-get install nodejs npm
```

---

## 📦 Installation Steps

### 1. Clone Repository
```bash
cd your-workspace
git clone <repository-url>
cd ecommerce-product-screen
```

### 2. Install Dependencies
```bash
npm install
```

This installs all required packages listed in `package.json`:
- React & React DOM
- Axios
- Bootstrap & React Bootstrap
- React Toastify
- React Router DOM (optional)

### 3. Verify Installation
```bash
npm start
```

If browser opens at `http://localhost:3000`, installation is successful!

---

## ⚙️ Environment Configuration

### Create .env File

In the project root, create `.env`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000

# Optional configurations (add as needed)
REACT_APP_ENV=development
REACT_APP_LOG_LEVEL=debug
```

### Available Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:3001/api` | ✅ Yes |
| `REACT_APP_API_TIMEOUT` | API request timeout (ms) | `10000` | ❌ No |
| `REACT_APP_ENV` | Environment (development/production) | `development` | ❌ No |

### Environment-Specific Configurations

#### Development
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENV=development
```

#### Production
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_API_TIMEOUT=15000
REACT_APP_ENV=production
```

---

## 🔧 Backend Setup (Required)

Your backend must expose these endpoints:

### 1. Get Products
```
GET /api/products
```

Sample response:
```json
[
  {
    "id": "1",
    "name": "iPhone 15",
    "description": "Latest Apple iPhone",
    "price": 79999,
    "category": "Mobiles",
    "imageUrl": "https://..."
  }
]
```

### 2. Delete Product
```
DELETE /api/products/{id}
```

Sample response:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 3. Enable CORS
Add CORS headers to your backend:

```javascript
// Express example
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## 🚀 Running the Application

### Development Mode
```bash
npm start
```

- Opens at `http://localhost:3000`
- Hot reload enabled
- Shows errors in console

### Production Build
```bash
npm run build
```

- Creates optimized build in `build/` folder
- Ready to deploy
- Smaller bundle size

### Test Mode
```bash
npm test
```

- Runs test suite
- Watch mode enabled

---

## 📁 Project Structure Explained

```
ecommerce-product-screen/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── ProductListing.js   # Main product list
│   │   └── ProductCard.js      # Individual product card
│   ├── services/
│   │   └── apiService.js       # API communication
│   ├── styles/
│   │   ├── App.css             # Global styles
│   │   ├── ProductCard.css     # Card styles
│   │   └── ProductListing.css  # List styles
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.js                  # Main app component
│   └── index.js                # React entry point
├── package.json                # Dependencies
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
└── API_INTEGRATION_GUIDE.md   # API documentation
```

---

## 🧪 Testing the Application

### Without Real Backend

**Option 1: Mock API Service**
Edit `src/services/apiService.js`:

```javascript
const apiService = {
  getProducts: async () => {
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
  deleteProduct: async (id) => {
    return { success: true, message: "Deleted" };
  }
};
```

**Option 2: JSON Server (Simple Mock Backend)**

```bash
# Install json-server globally
npm install -g json-server

# Create db.json in project root with mock-products.json content
json-server --watch db.json --port 3001
```

### With Real Backend

1. Ensure backend is running
2. Update `.env` with correct API URL
3. Test API endpoints:

```bash
# In PowerShell or Terminal
curl http://localhost:3001/api/products
curl -X DELETE http://localhost:3001/api/products/1
```

---

## 🐛 Troubleshooting

### Issue: Dependencies Installation Fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
Remove-Item -Recurse node_modules

# Reinstall
npm install
```

### Issue: Port 3000 Already in Use

**Solution (Windows PowerShell):**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Issue: .env Not Working

**Solution:**
```bash
# Ensure .env is in project root (not in src/)
# Restart development server
npm start
```

### Issue: API Connection Error

**Solution:**
1. Check if backend is running
2. Verify API URL in .env
3. Check browser console for error
4. Test API with curl:
```bash
curl http://localhost:3001/api/products
```

### Issue: CORS Error

**Solution 1: Backend - Add CORS**
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

**Solution 2: Use Proxy (temporary)**
Add to `package.json`:
```json
"proxy": "http://localhost:3001"
```

---

## 📚 Useful Commands

```bash
# Start development server
npm start

# Create production build
npm run build

# Run tests
npm test

# Eject configuration (not reversible!)
npm run eject

# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Install specific package
npm install package-name

# Remove package
npm uninstall package-name
```

---

## 🎨 Customization

### Change App Colors

Edit `src/styles/App.css`:

```css
/* Primary color */
--primary-color: #007bff;

/* Success color */
--success-color: #28a745;

/* Danger color */
--danger-color: #dc3545;
```

### Modify Grid Layout

Edit `src/components/ProductListing.js`:

```javascript
// Change from 4 columns to 5 on desktop
<Col key={product.id} xs={12} sm={6} lg={4} xl={2.4}>
```

### Add More Features

- Search functionality
- Product filtering by category
- Sorting options
- Pagination
- Product details page
- Shopping cart

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages

```bash
# Update package.json
"homepage": "https://username.github.io/repo-name"

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "npm run build && gh-pages -d build"

# Deploy
npm run deploy
```

### Deploy to Netlify

1. Build the app: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub account
5. Select repository
6. Set build command: `npm run build`
7. Set publish directory: `build`

---

## 🔐 Security Checklist

- [ ] Never commit `.env` to git (use `.env.example`)
- [ ] Validate user input
- [ ] Use HTTPS in production
- [ ] Implement authentication if needed
- [ ] Keep dependencies updated
- [ ] Sanitize product data
- [ ] Use Content Security Policy headers

---

## 📞 Getting Help

1. Check [README.md](./README.md)
2. Review [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)
3. Check browser console for errors
4. Review backend logs
5. Test with curl/Postman

---

## ✅ Verification Checklist

- [ ] Node.js and npm installed
- [ ] Dependencies installed (`npm install` completed)
- [ ] `.env` file created and configured
- [ ] Backend running on correct port
- [ ] `npm start` opens the app
- [ ] Products display on page
- [ ] Delete button works
- [ ] No errors in console

---

**You're all set! 🎉 Start coding!**

For issues, refer to the troubleshooting section or check the project documentation.
