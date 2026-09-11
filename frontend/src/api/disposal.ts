import apiClient from './client';

export const disposalApi = {
  getBatches: async () => (await apiClient.get('/disposal/batches')).data,
  getBatchById: async (id: string) => (await apiClient.get(`/disposal/batches/${id}`)).data,
  createBatch: async (data: any) => (await apiClient.post('/disposal/batches', data)).data,
  advanceBatch: async (id: string, stage: string) => (await apiClient.post(`/disposal/batches/${id}/advance`, { stage })).data,
  getDisposalRecords: async () => (await apiClient.get('/disposal/records')).data,
  getFacilities: async () => (await apiClient.get('/disposal/facilities')).data,
};
