import apiClient from './client';

export const complaintsApi = {
  getComplaints: async () => (await apiClient.get('/complaints')).data,
  getComplaintById: async (id: string) => (await apiClient.get(`/complaints/${id}`)).data,
  createComplaint: async (data: any) => (await apiClient.post('/complaints', data)).data,
  updateComplaint: async (id: string, data: any) => (await apiClient.put(`/complaints/${id}`, data)).data,
  assignComplaint: async (id: string, assigneeId: string) => (await apiClient.post(`/complaints/${id}/assign`, { assigneeId })).data,
  resolveComplaint: async (id: string, notes: string) => (await apiClient.post(`/complaints/${id}/resolve`, { notes })).data,
};
