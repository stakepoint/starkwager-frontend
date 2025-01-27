import * as React from "react";
import { useField } from "formik";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  includeSpans?: boolean;
  name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", includeSpans = true, name, ...props }, ref) => {
    const [field, meta] = useField(name);

    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-6 h-20">
          {includeSpans && (
            <div className="h-5">
              <span className="text-[#B9C0D4] w-24 text-base tracking-tighter">wager.strk/ </span>
              <span className="text-[#102A56] w-24 text-base tracking-tighter">@</span>
            </div>
          )}
          <div className="h-5">
            <input
              type={type}
              className={cn(
                "flex-1 bg-transparent text-[#102A56] outline-none text-base tracking-tighter",
                meta.touched && meta.error ? "border-red-500" : "",
                className
              )}
              ref={ref}
              {...field}
              {...props}
            />
          </div>
        </div>
        {meta.touched && meta.error && (
          <span className="text-sm text-red-500">{meta.error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
