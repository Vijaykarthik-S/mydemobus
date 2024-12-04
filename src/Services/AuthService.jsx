import axios from "axios";

// API URL for your backend authentication
const API_URL = "https://localhost:7247/api/Authentication";

// Login function
const login = async (username, password) => {
  try {
    console.log("service called");
    console.log(username, password);

    // Sending request to backend to authenticate user
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    // Log the full response to check for token and role
    console.log("API Response:", response);

    // Extract token and role from the response
    const { token, role } = response.data;

    // Check if the token is a string before saving it
    if (typeof token !== 'string') {
      throw new Error("Invalid token format");
    }

    // Save token and role to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    console.log("Token and Role saved to localStorage");

    // Return token and role for frontend use
    return { token, role };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Propagate the error to be handled elsewhere
  }
};

// Function to get protected data using the token
const getProtectedData = async () => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    console.log("Retrieved token:", token);

    // If no token is found, throw an error
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    // Send request to protected endpoint with the token in the Authorization header
    const response = await axios.get("https://localhost:7247/api/protected-endpoint", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the protected data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw error; // Propagate the error to be handled elsewhere
  }
};

export { login, getProtectedData };
