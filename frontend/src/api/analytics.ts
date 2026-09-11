import apiClient from './client';

export const analyticsApi = {
  getDashboardSummary: async () => (await apiClient.get('/analytics/dashboard')).data,
  getWasteTrends: async () => (await apiClient.get('/analytics/trends')).data,
  getCategoryDistribution: async () => (await apiClient.get('/analytics/categories')).data,
  getCollectionEfficiency: async () => (await apiClient.get('/analytics/efficiency')).data,
};
