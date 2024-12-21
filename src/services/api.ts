import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
});

export const fetchUsers = (page: number, limit: number) =>
  API.get(`/users/list?page=${page}&limit=${limit}`);

export const searchUsers = (query: string) =>
  API.get(`/users/search?q=${query}`);

export const signUp = (data: { name: string; email: string; password: string }) =>
  API.post('/users/signup', data);

export const signIn = (data: { email: string; password: string }) =>
  API.post('/users/signin', data);
