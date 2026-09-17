import api from './api';

export async function login(username, password) {
  const { data } = await api.post('/auth/login', { username, password });
  return data;
}

export async function updateAccount(payload) {
  const { data } = await api.put('/auth/account', payload);
  return data;
}
