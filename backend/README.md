
# Starry Hero Shop - Backend

This is the backend API for the Starry Hero Shop e-commerce application.

## Features

- User authentication and authorization
- Product management
- Order processing
- Coupon/discount system
- Payment processing with Stripe

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing

## API Endpoints

### Users
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Log in a user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `POST /api/users/address` - Add a new address (protected)
- `DELETE /api/users/address/:addressId` - Remove an address (protected)
- `POST /api/users/wishlist` - Add to wishlist (protected)
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist (protected)
- `GET /api/users/wishlist` - Get user wishlist (protected)

### Products
- `GET /api/products` - Get all products with filtering options
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all product categories
- `GET /api/products/themes` - Get all product themes
- `GET /api/products/:id` - Get a single product
- `POST /api/products/:id/reviews` - Create a product review (protected)
- `POST /api/products` - Create a product (admin)
- `PUT /api/products/:id` - Update a product (admin)
- `DELETE /api/products/:id` - Delete a product (admin)

### Orders
- `POST /api/orders` - Create a new order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get an order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Coupons
- `POST /api/coupons` - Create a coupon (admin)
- `GET /api/coupons` - Get all coupons (admin)
- `GET /api/coupons/:id` - Get a single coupon (admin)
- `PUT /api/coupons/:id` - Update a coupon (admin)
- `DELETE /api/coupons/:id` - Delete a coupon (admin)
- `POST /api/coupons/verify` - Verify a coupon code (protected)

### Payments
- `POST /api/payment/stripe` - Create Stripe payment intent (protected)
- `POST /api/payment/webhook` - Stripe webhook handler (public)

## Setup Instructions

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following variables:
   - `PORT`: Server port (default 5000)
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT
   - `JWT_EXPIRE`: JWT expiration (e.g., "30d")
   - `STRIPE_SECRET_KEY`: Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret (for production)
4. Run the server with `npm run dev` for development or `npm start` for production

## Deployment

This API is designed to be deployed on Render. Follow these steps:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command to `npm install`
4. Set the start command to `npm start`
5. Add the environment variables from your `.env` file
6. Deploy the service
