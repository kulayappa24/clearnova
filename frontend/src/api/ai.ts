import apiClient from './client';

export const aiApi = {
  predictWaste: async (data: any) => (await apiClient.post('/ai/predict', data)).data,
  getAiHealth: async () => (await apiClient.get('/ai/health')).data,
  getAiInsights: async () => (await apiClient.get('/ai/insights')).data,
};
