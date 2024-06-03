# Kryptonian App

## Table of Contents
- [Project Overview](#project-overview)
- [Features Implemented](#features-implemented)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Kryptonian App is designed to handle user authentication, including Two-Factor Authentication (2FA) using One-Time Passwords (OTP), and secure file uploads. This application adheres to modern RESTful API design principles and leverages a variety of technologies to ensure security and efficiency.

## Features Implemented

1. **Kryptonian Registration and Authentication**:
    - **User Registration**: Allows new users to register with an email and password.
        - Sends a confirmation email "Thank you for registering".
    - **User Login**: Authenticates users with email and password.
        - Checks if the user's email is confirmed before allowing login.
        - Generates an OTP and sends it to the user's email for successful login, also generates a temporary token.
    - **OTP Generation and Validation**: Ensures secure login by generating and validating OTPs.
        - Checks if an existing OTP is still valid before generating a new one.
    - **JWT Token Handling**: Issues JWT tokens for authenticated sessions.
        - Temporary JWT token issued for OTP validation.
2. **API Key Management**:
    - Users can generate API keys to upload files.
    - API keys are used for authenticating file uploads without requiring an auth token.
    - Users can invalidate API keys to make them unusable.
3. **File Upload Service**:
    - Users can upload image files using their API key.
    - Uploaded files are stored as Base64 strings in the database.
    - Uploaded files are deleted from the system after being stored.
    - Only image files are allowed.
4. **Image Access**:
    - Images can be accessed without authentication, as required.

## API Endpoints

### Base URL: ``

#### User Authentication

- **Register**
    - Registers a new user and sends a confirmation email.
    - `POST /auth/register`
    - Request:
        ```json
        {
          "email": "user@example.com",
          "password": "yourpassword"
        }
        ```
    - Response:
        ```json
        {
          "message": "User registered successfully."
        }
        ```


- **Login**
    - Logs in a user and sends an OTP to their email.
    - `POST /auth/login`
    - Request:
        ```json
        {
          "email": "user@example.com",
          "password": "yourpassword"
        }
        ```
    - Response:
        ```json
        {
          "message":  "Your OTP code is ${otp}"
        }
        ```

- **Verify OTP**
    - Verifies the OTP and logs in the user.
    - `POST /auth/verify-otp`
    
    - Request:
        ```json
        {
          "email": "yours@email.com"
          "otp": "123456"
        }
        ```
    - Response:
        ```json
        {
          "message": "OTP verified, login successful",
          "token": "auth_jwt_token"
        }
        ```

#### File Upload

- **Upload File**
    - Uploads an image file and associates it with the user.
    - `POST /files/uploadFile`
    - Headers:
        ```authorization 
        {
          "x-api-key": "your_api_key"
        }
        ```
    - Request: (using Form-data)
        ```vbnet
        Key: file
        Value: (Select an image file from your system)
        ```
    - Response:
        ```json
        {
          "message": "File uploaded successfully"
        }
        ```

#### Access Images

- **Get All Images**
    - Retrieves all images.
    - `GET /files/images`
    - Response:
        ```json
        {
        
          "data": [
            {
              "_id": "image_id_1",
              "filename": "image1.jpg",
              "base64": "base64_string_of_image1"
            },
            {
              "_id": "image_id_2",
              "filename": "image2.jpg",
              "base64": "base64_string_of_image2"
            }
          ]
        }
        ```

- **Get Single Image**
    - Retrieves a single image.
    - `GET /files/images/:id`
    - Response:
        ```json
        {
          "data": {
            "_id": "image_id",
            "filename": "image.jpg",
            "base64": "base64_string_of_the_image"
          }
        }
        ```

#### API Key Management

- **Generate API Key**
    - Generates a new API key for the user.
    - `POST /auth/generate-api-key`
   
    - Request:
        ```json
        {
          "email": "example@gmail.com"
        }
        ```
    - Response:
        ```json
        {
          "apiKey": "your_generated_api_key"
        }
        ```

- **Invalidate API Key**
    - Invalidates an existing API key.
    - `POST /auth/invalidate-api-key`
    - Headers:
      
    - Request:
        ```json
        {
          "apiKey": "your_api_key"
        }
        ```
    - Response:
        ```json
        {
          "message": "API key invalidated."
        }
        ```

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Nodemailer**: Node.js module for sending emails.
- **bcrypt.js**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating and verifying JWTs.
- **multer**: Middleware for handling multipart/form-data.
- **uuid**: Library for generating unique IDs (API keys).

## Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/kingsley-chukwuani /kryptonian_app.git
    cd kryptonian_app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
      ```env
      PORT=6000
      DB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ELASTICEMAIL_USERNAME=your_elasticemail_username
      ELASTICEMAIL_API_KEY=your_elasticemail_api_key
      SENDER_EMAIL=alexkingsley2@gmail.com
      ```

4. **Run the Application**:
    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

---
