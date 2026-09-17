import api from './api';

export async function getMessages() {
  const { data } = await api.get('/messages');
  return data;
}

export async function markMessageRead(id, isRead = true) {
  const { data } = await api.patch(`/messages/${id}`, { is_read: isRead });
  return data;
}

export async function deleteMessage(id) {
  await api.delete(`/messages/${id}`);
}
