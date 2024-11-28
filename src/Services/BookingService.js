import axios from "axios";

export const getBookingHistory = async (userId) => {
  const response = await axios.get(`https://localhost:7247/api/Booking/${userId}`);
  return response.data;
};