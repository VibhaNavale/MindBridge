import * as React from "react"
import { cn } from "../../lib/utils"
 
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "w-full min-h-[80px] border-0 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 p-0",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"
 
export { Textarea }