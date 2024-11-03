<p align="center">
  <a href="https://products-db.com/" target="blank"><img src="docs/logo-light.svg" width="200" alt="Products DB Logo" /></a>
</p>

<p align="center">Seamlessly integrate the power of <strong>ProductsDB</strong> into your Node.js applications with our SDK. Designed for simplicity and efficiency, this SDK provides an intuitive interface for accessing comprehensive product data, enabling developers to fetch, manage, and enrich product information effortlessly. 
</p>

## Features 🌟

- **Easy Integration**: Quick setup with minimal configuration required.
- **Robust Functionality**: Access a wide range of endpoints for real-time product data retrieval and management.
- **Multi-language Support**: Localized data available in 24 languages.
- **Secure Authentication**: Built-in API key authentication for secure data access.

## Getting Started 🛠️

To start using the ProductsDB Node.js SDK, simply install the package and follow our comprehensive documentation for setup and usage examples.

```bash
npm install products-db
```

or, using yarn:

```bash
yarn add products-db
```

## Usage 💻

### JavaScript Example

Here’s a quick example of how to use the ProductsDB SDK in JavaScript to search for a product by its EAN code:

```javascript
// Import the SDK
import { ProductsDBClient } from 'products-db';

// Initialize the client with your API key
const client = new ProductsDBClient({ apiKey: 'YOUR_API_KEY' });

// Search for a product by EAN
client
  .search({ ean: '123456789012', language: 'ja' })
  .then((product) => console.log(product))
  .catch((error) => console.error('Error fetching product:', error));
```

### TypeScript Example

For TypeScript users, here’s how to set up and use the SDK with type definitions for enhanced development:

```typescript
// Import the SDK
import { ProductsDBClient } from 'products-db';

// Initialize the client with your API key
const client = new ProductsDBClient({ apiKey: 'YOUR_API_KEY' });

// Search for a product by EAN
client
  .search({ ean: '123456789012', language: 'ja' })
  .then((product) => console.log(product))
  .catch((error) => console.error('Error fetching product:', error));
```

### Documentation 📚

For more details on available endpoints and methods, please visit our [official documentation](https://docs.products-db.com).
