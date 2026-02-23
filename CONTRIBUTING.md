# Contributing Guidelines

Thank you for your interest in contributing to the E-Commerce Product Screen project! This document provides guidelines and instructions for contributing.

---

## 📋 Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Provide constructive feedback
- Focus on the work, not the person
- Report inappropriate behavior

---

## 🚀 How to Contribute

### 1. Fork the Repository

```bash
# Click "Fork" on GitHub to create your copy
```

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-product-screen.git
cd ecommerce-product-screen
git remote add upstream https://github.com/ORIGINAL_OWNER/ecommerce-product-screen.git
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch Naming Convention:**
- Features: `feature/feature-name`
- Bug fixes: `fix/bug-name`
- Documentation: `docs/documentation-name`
- Refactoring: `refactor/refactor-name`

### 4. Make Your Changes

- Follow the [Code Style Guide](#code-style-guide)
- Keep commits small and focused
- Write clear commit messages
- Test your changes thoroughly

### 5. Update Documentation

- Update README if needed
- Add comments for complex logic
- Update relevant guide files
- Include examples if applicable

### 6. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing new feature"
# or
git commit -m "fix: resolve issue with product deletion"
```

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, missing semicolons, etc)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding/updating tests
- `chore:` Build process, dependencies, etc

**Example:**
```
feat: add product search functionality

Add search bar to ProductListing component
Allow filtering by product name and description
Implement debounce to reduce API calls

Closes #123
```

### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 8. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Submit for review

**Pull Request Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Screenshots (if applicable)
[Add screenshots]

## Testing
Describe testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
```

---

## 📝 Code Style Guide

### JavaScript/React

**Use Prettier for automatic formatting:**
```bash
npm install -D prettier
npx prettier --write src/
```

### Naming Conventions

```javascript
// Components: PascalCase
const ProductCard = () => {};
const ProductListing = () => {};

// Functions: camelCase
const handleDelete = () => {};
const fetchProducts = async () => {};

// Constants: UPPER_SNAKE_CASE
const API_TIMEOUT = 10000;
const MAX_PRODUCTS = 100;

// State variables: camelCase
const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(false);
```

### File Organization

```javascript
// 1. Import statements
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import apiService from '../services/apiService';

// 2. Type definitions (if using TypeScript)
// interface Product { ... }

// 3. Constants
const API_TIMEOUT = 10000;

// 4. Component
const ProductListing = () => {
  // 4a. State
  const [products, setProducts] = useState([]);
  
  // 4b. Effects
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // 4c. Event handlers
  const handleDelete = async (id) => {
    // ...
  };
  
  // 4d. Render
  return (
    <Container>
      {/* JSX */}
    </Container>
  );
};

// 5. Export
export default ProductListing;
```

### CSS Class Naming

```css
/* Use kebab-case for CSS classes */
.product-card { }
.product-image-container { }
.product-name { }

/* Use BEM (Block, Element, Modifier) for complex components */
.product-card { }
.product-card__image { }
.product-card__name { }
.product-card--featured { }
```

### Comments

```javascript
// Single line comment
const isValid = true; // Inline comment

/*
 * Multi-line comment
 * Explain complex logic
 * Use when needed
 */

// Use JSDoc for functions
/**
 * Fetch products from API
 * @param {object} options - Fetch options
 * @param {number} options.timeout - Request timeout
 * @returns {Promise<Array>} Array of products
 * @throws {Error} If fetch fails
 */
const getProducts = async (options = {}) => {
  // ...
};
```

---

## ✅ Testing

### Before Submitting PR

```bash
# Run tests
npm test

# Check linting
npm run lint

# Format code
npm run format

# Build and test
npm run build
npm start
```

### Writing Tests

```javascript
// src/components/__tests__/ProductCard.test.js
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('renders product information', () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 9999,
      category: 'Test',
      imageUrl: 'https://example.com/image.jpg'
    };

    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

---

## 🐛 Reporting Bugs

### Bug Report Template

**Title:** Brief description of the bug

**Description:**
- What were you doing when you found the bug?
- What did you expect to happen?
- What actually happened?

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
Describe what should happen

**Actual Behavior:**
Describe what actually happens

**Environment:**
- OS: [Windows/Mac/Linux]
- Node version: [e.g., 18.0.0]
- npm version: [e.g., 9.0.0]
- Browser: [Chrome/Firefox/Safari]

**Screenshots/Logs:**
[If applicable]

---

## 💡 Suggesting Enhancements

### Feature Request Template

**Title:** Brief feature description

**Problem Statement:**
Describe the problem this feature would solve

**Proposed Solution:**
How should this feature work?

**Alternative Solutions:**
Other approaches to consider

**Additional Context:**
Any other information

---

## 🗂️ Creating Issues

Use appropriate labels:
- `bug` - Bug reports
- `enhancement` - Feature requests
- `documentation` - Documentation improvements
- `good first issue` - Good for new contributors
- `help wanted` - Need community help
- `question` - Questions about usage
- `urgent` - Critical issues

---

## 📚 Documentation Contribution

### Updating Documentation

1. Identify the relevant documentation file
2. Make your updates
3. Ensure clarity and completeness
4. Include examples where helpful
5. Submit your changes

**Documentation Files:**
- [README.md](./README.md) - Main documentation
- [SETUP.md](./SETUP.md) - Setup instructions
- [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md) - API details
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [FEATURES_AND_ENHANCEMENTS.md](./FEATURES_AND_ENHANCEMENTS.md) - Future features

---

## 🔍 Code Review Process

### What to Expect

1. **Automated Checks**
   - Linting
   - Tests
   - Build verification

2. **Human Review**
   - Code quality
   - Architecture
   - Security
   - Performance
   - Testing

3. **Feedback**
   - Constructive comments
   - Suggestions for improvement
   - Approval or changes needed

### How to Respond to Feedback

- Review all comments carefully
- Ask for clarification if needed
- Make requested changes
- Respond to comments
- Re-request review when ready

---

## ⚠️ Important Guidelines

### Do's ✅

- ✅ Write clear, descriptive commit messages
- ✅ Keep PRs focused on one feature/fix
- ✅ Write tests for new features
- ✅ Update documentation
- ✅ Follow existing code style
- ✅ Test your changes thoroughly
- ✅ Be respectful and collaborative

### Don'ts ❌

- ❌ Don't include unrelated changes
- ❌ Don't submit without testing
- ❌ Don't ignore code review feedback
- ❌ Don't use offensive language
- ❌ Don't commit secrets or keys
- ❌ Don't remove existing features
- ❌ Don't break existing tests

---

## 🚀 Priority Areas for Contribution

See [FEATURES_AND_ENHANCEMENTS.md](./FEATURES_AND_ENHANCEMENTS.md) for:

**High Priority:**
- Search functionality
- Filtering options
- Sorting capabilities
- Pagination

**Medium Priority:**
- Product details page
- Shopping cart
- Product ratings
- Performance optimization

**Lower Priority:**
- Advanced analytics
- Multi-language support
- Admin panel
- Advanced features

---

## 📞 Questions?

- Check existing issues and PRs
- Review documentation
- Start a discussion
- Comment on relevant issue

---

## ✨ Recognition

Contributors will be recognized in:
- Project README
- CONTRIBUTORS file
- GitHub contributors page
- Release notes

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🎉 Thank You!

Your contributions make this project better. Thank you for helping!

**Happy contributing! 🚀**
