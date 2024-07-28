import axios from 'axios';

export const getUserProfile = async () => {
  const response = await axios.get('/api/user');
  return response.data;
};

export const updateUser = async (formData) => {
  const response = await axios.put('/api/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
