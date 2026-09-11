import apiClient from './client';

export const simulatorApi = {
  simulateFillLevel: async (id: string, level: number) => (await apiClient.post(`/simulator/bins/${id}/fill`, { level })).data,
  simulateWasteEvent: async (data: any) => (await apiClient.post('/simulator/waste-event', data)).data,
  simulateRandomTelemetry: async () => (await apiClient.post('/simulator/telemetry')).data,
  simulateBatch: async (data: any) => (await apiClient.post('/simulator/batch', data)).data,
  getSystemState: async () => (await apiClient.get('/simulator/state')).data,
};
