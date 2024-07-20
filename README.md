
# Sales Management App

Overview

This project is a Sales Management System built using the MERN stack (MongoDB, Express, React, Node.js). It features CRUD operations for managing products, suppliers, customers, purchases, and sales, along with an admin dashboard for viewing sales and purchase statistics.


## Features

- User authentication with JWT and cookies
- Role-based access control for admin and regular users
- CRUD operations for products, suppliers, customers, purchases, and sales
- Real-time stock management
- Dynamic charts for sales and purchase statistics
- Responsive and user-friendly UI


## Technologies used 

- MongoDB
- Express.js
- React.js
- Node.js
- Redux Toolkit
- Tailwind CSS
- Chart.js
## Installation

1. Clone the repository:

```bash
    git clone https://github.com/anisa1022/product-management.git
    cd product-management
```

2. Create a .env file in the backend directory and add the following environment variables:

```bash
    NODE_ENV=development
    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    VITE_API_URL=http://localhost:8000

```
3. Install Dependencies (frontend & backend):

```bash
    npm install
    cd frontend
    npm install
```

4. Run

```bash
    
# Run frontend (:3000) & backend (:8000)
npm run dev

# Run backend only
npm run server
```

5. Build and Deploy:

```bash
    # Create frontend prod build
    cd frontend
    npm run build
```


    
## Usage
- Open your browser and navigate to http://localhost:3000 to access the application.
- Register a new account or log in with an existing account.
- Admin users can access additional features such as managing products, suppliers, purchases, and sales, as well as viewing the dashboard.