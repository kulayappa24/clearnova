import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import {
  DashboardPage,
  BinsPage,
  BinDetailPage,
  LoginPage,
  AiDetectionPage,
  ComplaintsPage,
  MapPage,
  AnalyticsPage,
  WorkersPage,
  CollectionPage,
  RoutesPage,
  DisposalPage,
  NotificationsPage,
  SettingsPage,
  SimulatorPage,
  LeaderboardPage,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: 'bins',
        element: <BinsPage />,
      },
      {
        path: 'bins/:id',
        element: <BinDetailPage />,
      },
      {
        path: 'ai-detection',
        element: <AiDetectionPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'complaints',
        element: <ComplaintsPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'workers',
        element: <WorkersPage />,
      },
      {
        path: 'collections',
        element: <CollectionPage />,
      },
      {
        path: 'routes',
        element: <RoutesPage />,
      },
      {
        path: 'disposal',
        element: <DisposalPage />,
      },
      {
        path: 'notifications',
        element: <NotificationsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'simulator',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
