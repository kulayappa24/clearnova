import * as React from "react"
export const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`shrink-0 bg-border h-[1px] w-full ${className || ''}`} {...props} />
)
