import apiClient from './client';

export const routesApi = {
  getRoutes: async () => (await apiClient.get('/routes')).data,
  getRouteById: async (id: string) => (await apiClient.get(`/routes/${id}`)).data,
  generateRoute: async (data: any) => (await apiClient.post('/routes/generate', data)).data,
  startRoute: async (id: string) => (await apiClient.post(`/routes/${id}/start`)).data,
  completeRoute: async (id: string) => (await apiClient.post(`/routes/${id}/complete`)).data,
};
