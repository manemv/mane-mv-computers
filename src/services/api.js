// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Your Django API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPages = () => {
  return apiClient.get('/pages/');
};

export const fetchPageBySlug = (slug) => {
  return apiClient.get(`/pages/${slug}/`);
};
