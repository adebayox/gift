# Gift Cards Frontend

A React frontend application for managing gift cards and rewards products. This application consumes a REST API to display products with filtering, sorting, and pagination capabilities.

## Features

- **Product Listing**: Display gift cards with key information (merchant, price, category)
- **Searching & Filter**: Search by product name, merchant, or description; filter by category
- **Sorting**: Sort products by name, price, or merchant (ascending/descending)
- **Pagination**: Navigate through large product catalogs with configurable items per page
- **Product Details**: View detailed information for individual products

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js 
- npm or yarn package manager
- API key for the gift cards API

### Installation

1. **Clone the repository**
   ```bash
   git clone 
   cd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory and add Base URL & API key:
   ```env
   VITE_API_BASE_URL=endpoint
   VITE_API_KEY=api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## How to Run the Application

## Project Structure


## Approach & Implementation

### Data Retrieval
- **API Integration**: Consumes REST API endpoints using custom fetch utilities
- **Data Transformation**: Transforms API response format to match frontend requirements
- **Error Handling**: Implements comprehensive error handling with user-friendly messages

### Data Processing
- **Sorting**: Supports sorting by multiple fields (name, price, merchant) in both directions
- **Pagination**: Handles both server-side and client-side pagination strategies

### State Management
- **Custom Hooks**: Uses custom hooks (`useProducts`, `useCategories`) for data management
- **React State**: Leverages React's built-in state management with hooks
- **Loading States**: Implements proper loading and error states for better UX

### UI/UX Design
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Component Architecture**: Modular, reusable components
- **Progressive Enhancement**: Graceful fallbacks for missing data


## API Integration Details

### Endpoints Used
- `GET /business/products` - Retrieve paginated product list
- Supports query parameters: `page`, `limit`

- `GET /business/products/search` - for searching

- `GET /business/products/filters` - to get available categories and merchants








