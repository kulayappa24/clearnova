import apiClient from './client';

export const collectionsApi = {
  getTasks: async () => (await apiClient.get('/collections/tasks')).data,
  getTaskById: async (id: string) => (await apiClient.get(`/collections/tasks/${id}`)).data,
  createTask: async (data: any) => (await apiClient.post('/collections/tasks', data)).data,
  assignTask: async (id: string, workerId: string) => (await apiClient.post(`/collections/tasks/${id}/assign`, { workerId })).data,
  startTask: async (id: string) => (await apiClient.post(`/collections/tasks/${id}/start`)).data,
  completeTask: async (id: string) => (await apiClient.post(`/collections/tasks/${id}/complete`)).data,
  getTaskPriority: async (id: string) => (await apiClient.get(`/collections/tasks/${id}/priority`)).data,
};
