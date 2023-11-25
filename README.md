# MyServiceMate-Frontend
Welcome to the MyserviceMate frontend repository. This repository contains the frontend code for the Myservicemate project, a worker booking application built with Vite and React.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Environment Variables](#environmental-variable)
- [Screen Shots](#screen-shots)



## Project Overview
Myservicemate is a full-stack project that provides a comprehensive online booking application designed to streamline and simplify household service bookings. The frontend is built using Vite and React. This README focuses on the frontend component of the project.

## Features

### Services Listings by Area
- Browse and explore a wide range of services categorised by area, making it easy to find services available in each area.

### Worker Listing by Area and service
- Listing of workers based on the selected service and area included within a range of 15 kilometers.

### Date and Slot Selection
- Select appointment dates and time slots to book appointments at the user's convenience.

### Online Payment with Stripe
- Make secure online payments for completed works using the Stripe payment gateway, ensuring a seamless and secure transaction process.

### Real-Time Chat with workers
- Engage in real-time chat conversations with workes, improving the overall user experience.




## Prerequisites
Before you begin, ensure you have the following prerequisites:

- Node.js and npm (or Yarn)


## Installation
1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/Athul-Rajagopal/MyServiceMate-Frontend.git
   ```

2. Navigate to the project directory
```
cd MyServiceMate
``` 

3. install project dependencies

```
npm install
```

4. Configure your environment variables
You can view and manage the environmental variables in your `.env` file. Open it to set the necessary configuration values for your Doctime frontend. A list of all available environmental variables can be found in the [Environment Variables](#environment-variables) section below.

5. TO start developemt server run

```
npm run start
```
-  This will build the frontend and open the development server at http://localhost:5173 (or another available port if 3000 is already in use).


## Deploying the Backend

Before deploying your application, make sure to set up the backend server on your hosting platform. Ensure that you have all the necessary configurations, such as database connection settings, environment variables, and security measures in place.

For backend deployment, please refer to the backend repository for instructions and deployment guides:

[backend Repository](https://github.com/Athul-Rajagopal/MyServiceMate-Backend.git).


## Environment Variables

The following environmental variables should be set in your `.env` file:


- `VITE_REACT_APP_PUBLIC_KEY`
- `VITE_REACT_APP_SECRET_KEY`
- `VITE_SERVER`
- `VITE_WSERVER`
