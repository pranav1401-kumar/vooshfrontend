import api from '../utils/api';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const googleLogin = async () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
};

export const getProfile = async () => {
  const response = await api.get('/user');
  return response.data;
};
