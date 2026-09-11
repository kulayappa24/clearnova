import apiClient from './client';

export const notificationsApi = {
  getNotifications: async () => (await apiClient.get('/notifications')).data,
  markAsRead: async (id: string) => (await apiClient.post(`/notifications/${id}/read`)).data,
  markAllAsRead: async () => (await apiClient.post('/notifications/read-all')).data,
  getUnreadCount: async () => (await apiClient.get('/notifications/unread-count')).data,
};
