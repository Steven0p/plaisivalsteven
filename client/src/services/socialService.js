import api from './api';

export async function getSocials() {
  const { data } = await api.get('/socials');
  return data;
}
