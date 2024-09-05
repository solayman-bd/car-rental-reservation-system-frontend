# Car Rental Reservation System Backend

## Project Overview

Welcome to the Car Rental Reservation System Backend repository! This project provides a robust backend solution for managing car rentals, bookings, and user authentication within a web application environment.

## Live Demo

Explore the live demo of the application [here](https://car-rental-reservation-system-backend-3.onrender.com).

## Features

- **User Management**: Register and authenticate users with roles (admin and user).
- **Car Management**: CRUD operations for managing car listings, including soft deletes.
- **Booking Management**: Enable users to book cars and admins to oversee and manage bookings.
- **Authentication & Authorization**: Secure endpoints with JWT-based authentication and role-based access control.
- **Error Handling**: Proper validation and error responses for API requests.
- **Transaction Support**: Ensure data integrity with transactional support (if applicable).

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Documentation**: Swagger/OpenAPI (optional)

## Getting Started

To get started with the Car Rental Reservation System Backend, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/solayman-bd/car-rental-reservation-system-frontend.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set backend Variables**
   Go to ./redux/api/baseApi:
   ```bash
      const backendUrl = {
   BACKEND_DEV_BASE_URL: #use your development base url,
   BACKEND_PROD_BASE_URL: #use your production base url
   };
   ```
4. **Start the Development Server**

   ```bash
   npm run dev

   ```
