const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Configure WooCommerce API endpoint and authentication
const url = `${process.env.WC_URL}/wp-json/wc/v3/orders`;
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

// Set query parameters for filtering and pagination
const queryParams = {
  "filter[created_at_min]": "2022-12-12T00:00:00",
  "filter[created_at_max]": "2022-12-29T23:59:59",
  page: 1,
  per_page: 5,
  orderby: "title",
  order: "asc",
};

// Create a function to fetch WooCommerce orders
async function fetchWooCommerceOrders() {
  try {
    const response = await axios.get(url, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching WooCommerce orders:", error);
    return null;
  }
}

// Main function to execute the order fetching process
async function main() {
  const orders = await fetchWooCommerceOrders();

  if (orders) {
    console.log("Fetched WooCommerce orders:");
    console.log(orders);
  } else {
    console.log("No orders found.");
  }
}

// Call the main function to start the process
main();
