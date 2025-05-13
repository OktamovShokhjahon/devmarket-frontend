# DevMarket API Documentation

## Base URL

http://localhost:5000/api

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
`Authorization: Bearer <token>`

## Standard Response Format

```json
{
  "success": boolean,
  "data": any,
  "error": {
    "code": string,
    "message": string,
    "details": any
  },
  "meta": {
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

## Authentication API

### Register User

POST /auth/register

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "buyer" | "seller" | "admin"
}
```

### Login

POST /auth/login

```json
{
  "email": "string",
  "password": "string"
}
```

### Logout

POST /auth/logout
Protected: Yes

### Get Current User

GET /auth/me
Protected: Yes

### Request Password Reset

POST /auth/password-reset

```json
{
  "email": "string"
}
```

### Update Password

PUT /auth/password-update

```json
{
  "token": "string",
  "password": "string"
}
```

## Users API

### Get User

GET /users/{id}

### Update User

PUT /users/{id}
Protected: Yes

```json
{
  "name": "string",
  "email": "string"
}
```

### Get User Profile

GET /users/{id}/profile

### Update User Profile

PUT /users/{id}/profile
Protected: Yes

```json
{
  "bio": "string",
  "location": "string",
  "website": "string",
  "skills": ["string"],
  "languages": ["string"],
  "hourlyRate": number,
  "availability": "available" | "limited" | "unavailable"
}
```

### Update User Avatar

PUT /users/{id}/avatar
Protected: Yes
Content-Type: multipart/form-data

```
avatar: File
```

## Projects API

### Get All Projects

GET /projects
Query Parameters:

- page: number
- limit: number
- sort: string
- order: "asc" | "desc"
- category: string
- sellerId: string
- minPrice: number
- maxPrice: number
- query: string

### Get Project

GET /projects/{id}

### Create Project

POST /projects
Protected: Yes (Sellers only)

```json
{
  "title": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "tags": ["string"],
  "demoUrl": "string",
  "features": ["string"]
}
```

### Update Project

PUT /projects/{id}
Protected: Yes

### Delete Project

DELETE /projects/{id}
Protected: Yes

### Get Categories

GET /projects/categories

### Get Projects by Category

GET /projects/category/{categoryId}

### Search Projects

GET /projects/search
Query Parameters:

- query: string
- category: string
- minPrice: number
- maxPrice: number
- sort: "relevance" | "price_asc" | "price_desc" | "newest" | "popular" | "rating"

### Get Seller Projects

GET /projects/seller/{sellerId}

### Add Project Images

POST /projects/{id}/images
Protected: Yes
Content-Type: multipart/form-data

```
images: File[]
```

### Delete Project Image

DELETE /projects/{id}/images/{imageId}
Protected: Yes

## Orders API

### Get All Orders

GET /orders
Protected: Yes

### Get Order

GET /orders/{id}
Protected: Yes

### Create Order

POST /orders
Protected: Yes (Buyers only)

```json
{
  "projectId": "string",
  "requirements": "string"
}
```

### Update Order Status

PUT /orders/{id}/status
Protected: Yes

```json
{
  "status": "pending" | "in_progress" | "delivered" | "revision" | "completed" | "cancelled"
}
```

### Get Buyer Orders

GET /orders/buyer/{buyerId}
Protected: Yes

### Get Seller Orders

GET /orders/seller/{sellerId}
Protected: Yes

### Add Delivery Files

POST /orders/{id}/delivery
Protected: Yes (Sellers only)
Content-Type: multipart/form-data

```
files: File[]
```

### Request Revision

POST /orders/{id}/revision-request
Protected: Yes (Buyers only)

```json
{
  "requestText": "string"
}
```

### Accept Delivery

POST /orders/{id}/accept-delivery
Protected: Yes (Buyers only)

### Get Order Stats

GET /orders/stats
Protected: Yes

## Messages API

### Get Conversations

GET /messages/conversations
Protected: Yes

### Get Conversation Messages

GET /messages/conversations/{conversationId}
Protected: Yes

### Send Message

POST /messages/conversations/{conversationId}
Protected: Yes

```json
{
  "content": "string"
}
```

### Get Unread Count

GET /messages/unread-count
Protected: Yes

### Mark Messages as Read

POST /messages/mark-as-read
Protected: Yes

```json
{
  "conversationId": "string"
}
```

### Start New Conversation

POST /messages/send
Protected: Yes

```json
{
  "recipientId": "string",
  "content": "string"
}
```

## Reviews API

### Get Project Reviews

GET /reviews/project/{projectId}

### Get Seller Reviews

GET /reviews/seller/{sellerId}

### Create Project Review

POST /reviews/project/{projectId}
Protected: Yes (Buyers only)

```json
{
  "rating": number,
  "comment": "string"
}
```

### Create Seller Review

POST /reviews/seller/{sellerId}
Protected: Yes (Buyers only)

```json
{
  "rating": number,
  "comment": "string"
}
```

### Delete Review

DELETE /reviews/{reviewId}
Protected: Yes

## Transactions API

### Get All Transactions

GET /transactions
Protected: Yes

### Get Transaction

GET /transactions/{id}
Protected: Yes

### Get Transaction Stats

GET /transactions/stats
Protected: Yes

### Deposit Funds

POST /transactions/deposit
Protected: Yes

```json
{
  "amount": number,
  "paymentMethodId": "string"
}
```

### Withdraw Funds

POST /transactions/withdraw
Protected: Yes

```json
{
  "amount": number,
  "withdrawalMethod": "string",
  "accountDetails": "string"
}
```

## Admin API

### Get All Users

GET /admin/users
Protected: Yes (Admin only)

### Update User Status

PUT /admin/users/{id}/status
Protected: Yes (Admin only)

```json
{
  "status": "active" | "suspended" | "banned"
}
```

### Get Pending Projects

GET /admin/projects/pending
Protected: Yes (Admin only)

### Approve Project

PUT /admin/projects/{id}/approve
Protected: Yes (Admin only)

### Reject Project

PUT /admin/projects/{id}/reject
Protected: Yes (Admin only)

```json
{
  "reason": "string"
}
```

### Get All Transactions

GET /admin/transactions
Protected: Yes (Admin only)

### Get Admin Stats

GET /admin/stats
Protected: Yes (Admin only)

### Update Platform Settings

PUT /admin/settings
Protected: Yes (Admin only)

```json
{
  "platformName": "string",
  "supportEmail": "string",
  "commissionRate": number,
  "minimumWithdrawal": number,
  "autoApproveProducts": boolean,
  "autoApproveUsers": boolean
}
```

## Subscription API

### Get All Plans

GET /subscriptions/plans

### Get User Subscription

GET /subscriptions/user/{userId}
Protected: Yes

### Subscribe to Plan

POST /subscriptions/subscribe
Protected: Yes (Sellers only)

```json
{
  "planId": "string",
  "paymentMethodId": "string",
  "billingCycle": "monthly" | "yearly"
}
```

### Cancel Subscription

PUT /subscriptions/{id}/cancel
Protected: Yes

### Change Subscription Plan

POST /subscriptions/change-plan
Protected: Yes (Sellers only)

```json
{
  "planId": "string",
  "paymentMethodId": "string"
}
```

## WebSocket Events

### Connection

```javascript
// Connect with authentication
socket.auth = { token: "JWT_TOKEN" };
socket.connect();
```

### Send Message

```javascript
socket.emit("sendMessage", {
  conversationId: "string",
  content: "string",
  recipientId: "string",
});
```

### Mark Messages as Read

```javascript
socket.emit("markAsRead", {
  conversationId: "string",
});
```

### Typing Indicators

```javascript
socket.emit("typing", {
  conversationId: "string",
  recipientId: "string",
});

socket.emit("stopTyping", {
  conversationId: "string",
  recipientId: "string",
});
```

### Event Listeners

```javascript
socket.on("newMessage", (message) => {
  // Handle new message
});

socket.on("messagesRead", (data) => {
  // Handle read receipt
});

socket.on("userTyping", (data) => {
  // Handle typing indicator
});

socket.on("userStoppedTyping", (data) => {
  // Handle stop typing
});

socket.on("notification", (data) => {
  // Handle notification
});

socket.on("error", (error) => {
  // Handle error
});
```
