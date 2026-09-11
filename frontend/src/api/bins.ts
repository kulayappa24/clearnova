import apiClient from './client';

export const binsApi = {
  getBins: async () => (await apiClient.get('/bins')).data,
  getBinById: async (id: string) => (await apiClient.get(`/bins/${id}`)).data,
  createBin: async (data: any) => (await apiClient.post('/bins', data)).data,
  updateBin: async (id: string, data: any) => (await apiClient.put(`/bins/${id}`, data)).data,
  getBinReadings: async (id: string) => (await apiClient.get(`/bins/${id}/readings`)).data,
  getBinPrediction: async (id: string) => (await apiClient.get(`/bins/${id}/prediction`)).data,
  getCriticalBins: async () => (await apiClient.get('/bins/critical')).data,
  getBinsForMap: async () => (await apiClient.get('/bins/map')).data,
};
