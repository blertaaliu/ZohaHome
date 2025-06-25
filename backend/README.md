# Zoha's Home Backend API

A full-stack e-commerce backend built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access
- **Product Management**: CRUD operations for products with image uploads
- **Order Management**: Complete order lifecycle with payment processing
- **Admin Dashboard**: Statistics, analytics, and management tools
- **Payment Integration**: Stripe payment processing
- **File Upload**: Image upload for products
- **Search & Filtering**: Advanced product search and filtering

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Payment**: Stripe
- **Password Hashing**: bcryptjs

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/zohahome
   JWT_SECRET=your-super-secret-jwt-key-here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```

4. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update MONGODB_URI in .env file

5. **Stripe Setup**
   - Create a Stripe account
   - Get your API keys from Stripe Dashboard
   - Update STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY in .env

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders` - Get all orders (admin only)

### Dashboard (Admin Only)
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/sales-chart` - Get sales chart data
- `GET /api/dashboard/category-stats` - Get category statistics

## Database Models

### User
- Authentication fields (username, email, password)
- Profile information (firstName, lastName, phone, address)
- Role-based access (admin/user)

### Product
- Product details (name, description, price, category)
- Inventory management (stock, availability)
- Media (images)
- Additional info (dimensions, material, color, brand)

### Order
- Order items with quantities and prices
- Customer information and addresses
- Payment details and status
- Order lifecycle management

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- File upload security
- CORS configuration

## File Structure

```
backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── uploads/         # File uploads directory
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 5000) |
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT tokens | Yes |
| STRIPE_SECRET_KEY | Stripe secret key | Yes |
| STRIPE_PUBLISHABLE_KEY | Stripe publishable key | Yes |
| NODE_ENV | Environment (development/production) | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 