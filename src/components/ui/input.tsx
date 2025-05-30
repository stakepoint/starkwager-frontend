import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, placeholder, type, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-4 py-1 text-blue-950 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-grey-8 dark:text-white",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
