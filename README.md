# Gift Cards & Rewards Frontend

A React-based frontend application for browsing and managing gift cards and rewards products. This application consumes a REST API to display products with filtering, sorting, and pagination capabilities.

## Features

- **Product Listing**: Display gift cards with key information (merchant, price, category)
- **Search & Filter**: Search by product name, merchant, or description; filter by category
- **Sorting**: Sort products by name, price, or merchant (ascending/descending)
- **Pagination**: Navigate through large product catalogs with configurable items per page
- **Product Details**: View detailed information for individual products
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **HTTP Client**: Axios (via custom fetch utilities)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- API key for the gift cards API

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd gift-cards-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## How to Run the Application

### Development Mode
```bash
npm run dev
```
Runs the app in development mode with hot reloading.

### Production Build
```bash
npm run build
npm run preview
```
Creates an optimized production build and serves it locally.

### Linting
```bash
npm run lint
```
Runs ESLint to check for code quality issues.

## Project Structure

```
src/
├── components/
│   ├── cards/
│   │   └── ProductCard.jsx          # Individual product card component
│   ├── common/
│   │   ├── Loading.jsx              # Loading spinner component
│   │   ├── ErrorMessage.jsx         # Error display component
│   │   └── Pagination.jsx           # Pagination controls
│   └── filters/
│       └── FilterBar.jsx            # Search and filter controls
├── hooks/
│   ├── useProducts.js               # Custom hook for product data management
│   └── useCategories.js             # Custom hook for category data
├── pages/
│   ├── ProductsPage.jsx             # Main products listing page
│   └── ProductDetailPage.jsx        # Individual product detail page
├── services/
│   └── api.js                       # API service layer
├── utility/
│   └── fetchFunction.js             # HTTP client utilities
└── App.jsx                          # Main app component
```

## Approach & Implementation

### Data Retrieval
- **API Integration**: Consumes REST API endpoints using custom fetch utilities
- **Data Transformation**: Transforms API response format to match frontend requirements
- **Error Handling**: Implements comprehensive error handling with user-friendly messages

### Data Processing
- **Client-side Filtering**: Implements search and category filtering on the frontend
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

### Image Handling
- **Smart Image Matching**: Automatically assigns appropriate images based on merchant names
- **Category Fallbacks**: Uses category-based images when merchant-specific images aren't available
- **Error Handling**: Fallback images for broken or missing image URLs

## API Integration Details

### Endpoints Used
- `GET /business/products` - Retrieve paginated product list
- Supports query parameters: `page`, `limit`

### Data Transformation
The application transforms the API response structure:

**API Response:**
```json
{
  "_id": "...",
  "merchant": "...",
  "category": ["..."],
  "country": ["..."],
  "maxPrice": 100,
  "minPrice": 10
}
```

**Frontend Format:**
```json
{
  "id": "...",
  "merchant": "...",
  "category": "...",
  "country": "...",
  "value": 100,
  "image": "..."
}
```

## Assumptions Made

1. **API Limitations**: 
   - The API doesn't support server-side search/filtering, so filtering is implemented client-side
   - No dedicated endpoint for single product retrieval

2. **Data Structure**:
   - Categories and countries can be arrays or strings in the API response
   - Product descriptions might be URLs pointing to markdown files
   - All products have required fields (merchant, prices, etc.)

3. **Image Strategy**:
   - Product images are not provided by the API
   - Images are assigned based on merchant name matching and category fallbacks
   - Using free stock photos from Pexels as placeholders

4. **Pagination Strategy**:
   - For comprehensive search/filtering, the app fetches all products initially
   - This assumes a reasonable dataset size (under 1000 products)
   - For larger datasets, server-side filtering would be recommended

5. **Browser Support**:
   - Modern browsers with ES6+ support
   - JavaScript enabled
   - No IE11 support (due to Vite and modern React)

6. **Performance**:
   - Client-side filtering is acceptable for the expected dataset size
   - Images are loaded lazily through browser's native lazy loading

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | API key for authentication | Yes |

## Browser Compatibility

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Follow the existing code style and structure
2. Add appropriate error handling for new features
3. Ensure responsive design for new components
4. Update this README when adding new features or changing setup instructions

## Troubleshooting

### Common Issues

1. **No products showing**: Check your API key in `.env` file
2. **Images not loading**: Check network connectivity and image URLs
3. **Pagination not working**: Verify API response structure matches expected format
4. **Build errors**: Ensure all dependencies are installed correctly

### Debug Mode
Add `console.log` statements are included in development mode. Check browser developer tools for detailed API responses and error messages.
