
# Simple E-commerce API

This project is a simple e-commerce API built to manage product listings, shopping cart operations, order creation, and user authentication with role-based access control. The API uses JSON Web Tokens (JWT) for securing routes and supports two user roles: Customer and Admin. A basic frontend is included for interacting with the API, and optional features like pagination and product search are implemented for enhanced functionality.


## Include This Features

- Product Listings: Fetch a list of available products with optional pagination and search by name or category.
- Cart Management: Customers can add, update, or remove items from their shopping cart.
- Order Creation: Customers can create orders from their cart.
- User Authentication: JWT-based authentication for secure access.
- User Roles:
Customer: Can view products, manage their cart, and place orders.

- Admin: Can manage products (add, update, delete) in addition to customer privileges.

- Frontend: Using ReactJS to create Register,Login, Products, Cart,Order, interact with the API.



## Tech Stack

Technologies Used

**Backend**:
Node.js with Express.js, PostgreSQL,
JSON Web Tokens (JWT) for authentication, cors, bcrypt for password hashing)

**Frontend**:
ReactJS , axios(Fetch API for making requests to the backend
Other Tools

**Postman (for API testing)**
Any other libraries or tools used (e.g., dotenv for environment variables)

## API Reference

#### Get all items

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | Required. User's username |
| `password` | `string` | Required. User's username |
| `role` | `string` | Optional. Role (customer or admin, defaults to customer)|

#### POST item

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username |
| `password`      | `string` | **Required**. password |

#### add(num1, num2)

```http
  GET /api/products
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `num` | Optional. Page number for pagination (e.g., 1)|
| `search`      | `string` | Optional. Search products by name |
| `limit`      | `num` | Optional. Number of items per page (e.g., 10)|
| `category`      | `string` | Optional. Filter products by category |

```http
  POST /api/products/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `num` | Product name|
| `price`      | `num` | Required. Product price |
| `desc`      | `string` |  Product desc|
| `category`      | `string` | Product category |


```http
  PUT /api/products/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Product update|
| `name`      | `string` | product name|
| `price`      | `string` | product price |
| `category`      | `string` | Product category |



```http
  DELETE /api/products/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Product delete|

## Installation

Clone the Repository:

```bash
  git clone <repository-url>
cd simple-ecommerce-api
```
Install Dependencies for backend:
```bash
  npm install express,dotenv,bycrypt,jsonwebtoken,pg
```

Install Dependencies for frontend:

```bash
  npm create vite@latest -- --template react
  cd app-name
  npm install

```
Run the Application:


```bash
  
  npm run dev

```
## Authors

- [@ramesh](https://github.com/ramesh043/simple-ecommerce-api)

