import * as React from "react"
export const Dialog = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
export const DialogContent = ({ children }: { children: React.ReactNode }) => <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div className="bg-white p-6 rounded-lg">{children}</div></div>
export const DialogTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-semibold">{children}</h2>
export const DialogTrigger = ({ children }: { children: React.ReactNode }) => <span>{children}</span>
