// userService.js
import axios from 'axios';

export const fetchUserData = async (email) => {
  if (!email) {
    console.error('Email is undefined');
    return null;
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
