# JWT Authentication

This project demonstrates a basic implementation of JSON Web Token (JWT) authentication using two Express.js applications. It includes endpoints for user login, token generation, token refreshing, and authenticated access to protected resources.

## Project Structure

- `app.js`: Handles authenticated access to protected resources using access tokens.
- `authApp.js`: Handles user login, refresh token generation, and management.

## Features

### `authApp.js`
- **Login Endpoint (`/login`)**
  - Accepts a username in the request body and generates an access token and a refresh token.
  - Example request body:
    ```json
    {
      "username": "exampleUser"
    }
    ```
  - Example response:
    ```json
    {
      "accessToken": "<access_token>",
      "refreshToken": "<refresh_token>"
    }
    ```

- **Token Refresh Endpoint (`/token`)**
  - Accepts a refresh token in the request body and provides a new access token if the refresh token is valid.
  - Example request body:
    ```json
    {
      "token": "<refresh_token>"
    }
    ```
  - Example response:
    ```json
    {
      "accessToken": "<new_access_token>"
    }
    ```

- **Logout Endpoint (`/logout`)**
  - Invalidates the refresh token, logging out the user.
  - Example request body:
    ```json
    {
      "token": "<refresh_token>"
    }
    ```

### `app.js`
- **Protected Resource Endpoint (`/posts`)**
  - Requires an access token for authentication.
  - Filters and returns posts belonging to the authenticated user.

- **Token Authentication Middleware**
  - Validates the provided access token before granting access to protected resources.

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
JWT_SECRET=<your_jwt_secret>
JWT_REFRESH=<your_jwt_refresh_secret>
APP_PORT=3000
AUTH_PORT=4000
```

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Applications
1. Start the authentication server:
   ```bash
   node authApp.js
   ```
2. Start the main application server:
   ```bash
   node app.js
   ```

### Testing the Endpoints
Use a tool like [Postman](https://www.postman.com/) or `curl` to test the endpoints:

1. **Login**
   ```bash
   curl -X POST http://localhost:4000/login -H "Content-Type: application/json" -d '{"username": "testUser"}'
   ```
2. **Access Protected Resource**
   ```bash
   curl -X GET http://localhost:3000/posts -H "Authorization: Bearer <access_token>"
   ```
3. **Refresh Token**
   ```bash
   curl -X POST http://localhost:4000/token -H "Content-Type: application/json" -d '{"token": "<refresh_token>"}'
   ```
4. **Logout**
   ```bash
   curl -X DELETE http://localhost:4000/logout -H "Content-Type: application/json" -d '{"token": "<refresh_token>"}'
   ```

## Notes
- Access tokens are valid for 15 minutes by default.
- Refresh tokens are stored in memory for simplicity but should be managed securely in a production environment (e.g., using a database).
- Replace `<your_jwt_secret>` and `<your_jwt_refresh_secret>` in the `.env` file with secure, random strings.
