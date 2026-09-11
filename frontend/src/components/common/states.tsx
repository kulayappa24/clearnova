import React from 'react';
export const LoadingPage = () => <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
export const ErrorPage = () => <div className="flex h-screen w-full items-center justify-center text-red-500">An error occurred</div>;
export const EmptyState = ({ message }: { message?: string }) => <div className="p-8 text-center text-gray-500">{message || "No data found"}</div>;
