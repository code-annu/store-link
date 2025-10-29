# StoreLink Backend API

## Overview

This document provides comprehensive guidance for the StoreLink ecommerce backend API. It contains all features available in the StoreLink application with proper navigation and usage instructions.

**Base API URL:** `http://localhost:3000/api/v1/`

---

## Authentication

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| Signup | `auth/signup` | POST | No | `email`, `password`, `role` |
| Login | `auth/login` | POST | No | `email`, `password` |
| Refresh Token | `auth/refresh-token` | POST | No | `refresh-token` |

**Available Roles:** `buyer`, `seller`, `delivery-partner`

---

## Buyer Profile

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| Create Profile | `buyer/` | POST | Yes | `fullname`, `profile_picture_url`, `address` |
| Get Profile | `buyer/` | GET | Yes | - |
| Update Profile | `buyer/` | PATCH | Yes | Partial fields from create profile |
| Delete Profile | `buyer/` | DELETE | Yes | - |

---

## Seller Profile

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| Create Profile | `seller/` | POST | Yes | `fullname`, `profile_picture_url` |
| Get Profile | `seller/` | GET | Yes | - |
| Update Profile | `seller/` | PATCH | Yes | Partial fields from create profile |
| Delete Profile | `seller/` | DELETE | Yes | - |

---

## Delivery Partner Profile

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| Create Profile | `delivery-partner/` | POST | Yes | `fullname`, `profile_picture_url` |
| Get Profile | `delivery-partner/` | GET | Yes | - |
| Update Profile | `delivery-partner/` | PATCH | Yes | Partial fields from create profile |
| Delete Profile | `delivery-partner/` | DELETE | Yes | - |
| Get Deliveries | `delivery-partner/deliveries` | GET | Yes | - |

---

## Store and Product Management

### Store Operations

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| Create Store | `store/` | POST | Yes | `name`, `address`, `description`, `image_url` |
| Get Store | `store/{storeUid}` | GET | Yes | - |
| Update Store | `store/{storeUid}` | PATCH | Yes | Partial fields from create store |
| Delete Store | `store/{storeUid}` | DELETE | Yes | - |

### Product Operations

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| List Products | `store/{storeUid}/products` | GET | Yes | - |
| Add Product | `store/{storeUid}/products` | POST | Yes | `name`, `price`, `image_url`, `description`, `category` |
| Get Product | `store/{storeUid}/products/{productUid}` | GET | Yes | - |
| Update Product | `store/{storeUid}/products/{productUid}` | PATCH | Yes | Partial fields from add product |
| Delete Product | `store/{storeUid}/products/{productUid}` | DELETE | Yes | - |

---

## Order Management

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| Create Order | `order/` | POST | Yes | `product_uid` |
| Get Order | `order/{orderUid}` | GET | Yes | - |
| Get Unclaimed Orders | `order/unclaimed` | GET | Yes | - |
| Claim Order | `order/{orderUid}/claim` | PATCH | Yes | - |
| Update Order Status | `order/{orderUid}/status` | PATCH | Yes | `status` |

---

## Product Discovery

| Feature | Endpoint | Method | Authorized | Request Body |
|---------|----------|--------|------------|--------------|
| Search Products | `products/search?query=` | GET | No | - |
| Get Products by Category | `products/category/{category}` | GET | No | - |
| Get Trending Products | `products/trending` | GET | No | - |
| Get Product Details | `products/{productUid}` | PATCH | No | - |

---

## Getting Started

1. **Base URL Configuration**: All API endpoints use the base URL `http://localhost:3000/api/v1/`
2. **Authentication**: Most endpoints require authentication. Use the authentication endpoints to obtain access tokens
3. **Role-Based Access**: Different features are available based on user roles (buyer, seller, delivery-partner)
4. **Authorization Header**: For authorized endpoints, include the authentication token in your request headers

---

## Notes

- All `PATCH` requests accept partial updates using fields from their respective creation endpoints
- Parameters in curly braces `{parameter}` are path variables that should be replaced with actual values
- Query parameters are appended to the URL using the `?` notation

---

## License

MIT License

---

**Happy Coding!** 🚀
