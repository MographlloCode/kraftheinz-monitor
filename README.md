# Kraft Heinz Monitor

This API provides information about Kraft Heinz products, including their goals and usage data. It is built with Node.js and MongoDB.

## Features

- Retrieve information about Kraft Heinz products
- Get product goals and usage details
- Add new products
- Update existing product information
- Delete products

## Requirements

- Node.js
- MongoDB Atlas

## Installation

1. Clone the repository:
   `git clone https://github.com/MographlloCode/kraftheinz-monitor.git`

2. Install dependencies:
   `npm install`

3. Configure the environment variables:

Create a `.env` file in the root directory and provide the following variable:

`MONGODB_URI`

You can find the MONGODB_URI in your connection screen at MongoDB Atlas
Make sure to update the `MONGODB_URI` with your MongoDB connection string.

4. Start the server:

`npm start`