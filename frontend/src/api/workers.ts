import apiClient from './client';

export const workersApi = {
  getWorkers: async () => (await apiClient.get('/workers')).data,
  getWorkerById: async (id: string) => (await apiClient.get(`/workers/${id}`)).data,
  getWorkerStats: async (id: string) => (await apiClient.get(`/workers/${id}/stats`)).data,
  updateWorkerStatus: async (id: string, status: string) => (await apiClient.put(`/workers/${id}/status`, { status })).data,
};
