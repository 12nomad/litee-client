"use client";

import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  inputId?: string;
  placeholder?: string;
  type?: string;
  withForgotPassword?: boolean;
}

function Input({
  name,
  label,
  inputId,
  placeholder,
  type = "text",
  withForgotPassword = false,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            {label}
          </label>
          {withForgotPassword && (
            <p className="pb-2 text-sm text-caribbean font-bold">
              Forgot Password?
            </p>
          )}
        </div>
      )}
      {type === "password" ? (
        <div className="relative">
          <input
            name={name}
            type={showPassword ? "text" : "password"}
            id={inputId}
            className="block w-full p-2 ps-4 text-black rounded-lg text-sm border border-black focus:outline-caribbean"
            placeholder={placeholder}
            {...props}
          />
          <div
            className="absolute inset-y-0 end-4 flex items-center z-10 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeSlashIcon className="size-4 text-black cursor-pointer" />
            ) : (
              <EyeIcon className="size-4 text-black cursor-pointer" />
            )}
          </div>
        </div>
      ) : type === "search" ? (
        <div className="relative">
          <input
            name={name}
            type={type}
            id={inputId}
            className="block w-full p-2 ps-9 text-black rounded-lg text-sm border border-black focus:outline-caribbean"
            placeholder={placeholder}
            {...props}
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon className="size-4 text-black" />
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            name={name}
            type={type}
            id={inputId}
            className="block w-full p-2 ps-4 text-black rounded-lg text-sm border border-black focus:outline-caribbean"
            placeholder={placeholder}
            {...props}
          />
        </div>
      )}
    </div>
  );
}

export default Input;
