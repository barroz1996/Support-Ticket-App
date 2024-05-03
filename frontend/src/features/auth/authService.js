import axios from 'axios'

const API_URL = '/api/users'

//Register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error('Empty response from server');
    }
  } catch (error) {
    // Handle errors
    console.error('Registration failed:', error);
    throw error;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Login user
const login = async (userData) =>{
  try {
    const response = await axios.post(API_URL + '/login', userData);
    if (response.data) {
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error('Empty response from server');
    }
  } catch (error) {
    // Handle errors
    console.error('Registration failed:', error);
    throw error;
  }
};

const authService = {
  register,
  logout,
  login,
}

export default authService