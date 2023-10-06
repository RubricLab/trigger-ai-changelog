"use client";

import { XIcon } from "lucide-react";
import React, { useEffect, useId, useState } from "react";

type Props = {
  label?: string;
  name?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  initialValue?: string;
  clearable?: boolean;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
  className?: string;
};

export const Input = ({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
  fullWidth = false,
  placeholder,
  initialValue,
  clearable = false,
  onChange,
  className,
}: Props) => {
  const [value, setValue] = useState(initialValue || "");
  const inputId = useId();

  useEffect(() => {
    onChange?.(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="space-y-0.5 w-full group">
      {label && <label htmlFor={inputId}>{label}</label>}
      <div className="relative">
        <input
          id={inputId}
          value={value}
          name={name}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={`${
            className || ""
          } p-2 pr-8 text-ellipsis text-sm rounded-sm bg-secondary/90 text-secondary-foreground enabled:hover:bg-secondary focus:outline-none focus:ring-4 ring-indigo-500/60 focus:border-opacity-0 w-full transition-colors disabled:opacity-70 ${
            fullWidth ? "w-full" : "w-fit"
          }`}
        />
        {clearable && (
          <button
            className={`p-2 absolute right-0 inset-y-0 hover:text-red-400 transition-opacity opacity-0 focus:outline-none ${
              value ? "group-hover:opacity-100" : ""
            }`}
            onClick={() => setValue("")}
            type="button"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
