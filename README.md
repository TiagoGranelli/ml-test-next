# ML-TEST-NEXT Project

## Overview

This project is part of the practical test for frontend developer candidates at Mercado Livre / Mercado Pago. The application consists of a client built with React and styled using SCSS, utilizing Next.js, and a server powered by Express. The web application features three main components: a search box, a results display, and detailed product descriptions.

## Project Structure

The project is divided into two main directories:

- **client**: Contains the Next.js application which implements the frontend logic and user interface.
- **server**: Houses the Express application that handles backend operations including API endpoints for fetching product data.

### Client

The client side is structured as follows:

- **src**: Contains the source files for the frontend application.
  - **components**: Includes reusable React components like `BreadCrumb` and `LoadingDots`.
  - **pages**: React components that represent full web pages.
  - **styles**: Global styles and module-specific stylesheets.

### Server

The server directory contains:

- **routes**: Defines the Express routes to handle API requests.
- **index.ts**: The entry point for the Express server.

## Technology Stack

### Client

- **React**: For building the user interface.
- **Next.js**: A React framework with features like server-side rendering.
- **SCSS**: For styling components.
- **Axios**: Used to make HTTP requests to external services.

### Server

- **Node.js (v20.12.2)**: The runtime environment for the server.
- **Express**: Framework for handling server-side logic.
- **Cors**: To handle cross-origin resource sharing.
- **Axios**: For making HTTP requests.

## Features

The application is designed with the following features in mind:

- **Search Box**: Allows users to search for products by name.
- **Results Display**: Shows search results with basic product information.
- **Product Details**: Provides detailed information about a specific product.

### Endpoints

- **GET /api/items?search=:query**: Fetches products based on search queries.
- **GET /api/items/:id**: Fetches detailed information about a specific product.

## Setup and Running the Project

### Prerequisites

- Node.js (v20.12.2 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TiagoGranelli/ml-test-next.git
   cd ml-test-next
   ```

2. **Install dependencies for the server**:
   ```bash
   cd server
   npm install
   ```

3. **Run the server**:
   ```bash
   npm start
   ```

4. **Install dependencies for the client**:
   ```bash
   cd ../client
   npm install
   ```

5. **Run the client**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` in your browser to view the application.