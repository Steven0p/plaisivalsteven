import api from './api';

export async function getExperiences() {
  const { data } = await api.get('/experiences');
  return data;
}
