import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ProductListing from './components/ProductListing';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">
            🛍️ E-Commerce Store
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#products" active>
              Products
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="main-content">
        <ProductListing />
      </main>

      {/* Footer */}
      <footer className="footer mt-5 py-4 bg-light text-center">
        <Container>
          <p className="text-muted mb-0">
            © 2026 E-Commerce Store. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
