"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  getInputStyles,
  checkMinLength,
  checkUppercase,
  checkDigit,
  isValidPassword,
  isValidEmail,
  getRequirementStyle,
} from "../utils/formValidation";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .refine((val) => !/\s/.test(val), { message: "No spaces allowed" }),
});

type FormData = z.infer<typeof schema>;

export default function AuthForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = () => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const submitBtn = document.getElementById(
      "submit-btn"
    ) as HTMLButtonElement;

    if (emailInput && !errors.email) {
      emailInput.classList.remove("bg-white");
      emailInput.classList.add("bg-green-100");
      emailInput.disabled = true;
    }

    if (passwordInput && !errors.password) {
      passwordInput.classList.add("bg-green-100");
      passwordInput.classList.remove("bg-white");
      passwordInput.disabled = true;
    }

    submitBtn.disabled = true;
    setIsSubmitted(true);
  };

  const emailValue = watch("email") || "";
  const passwordValue = watch("password") || "";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#F4F9FF] to-[#E0EDFB] px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-black flex justify-center">
          Sign Up
        </h2>

        <div className="mb-4">
          <input
            {...register("email")}
            type="email"
            id="email"
            className={getInputStyles(
              isValidEmail(emailValue),
              !isValidEmail(emailValue) && emailValue !== ""
            )}
            placeholder="Email"
          />
        </div>

        <div className="mb-4 relative">
          <input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            className={`w-full text-black p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${getInputStyles(
              isValidPassword(passwordValue),
              !isValidPassword(passwordValue) && passwordValue !== ""
            )}`}
            placeholder="Password"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-4 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-16">
          <p
            className={`text-sm mt-2 leading-tight ${getRequirementStyle(
              checkMinLength(passwordValue),
              passwordValue
            )}`}
          >
            Has at least 8 characters (no spaces)
          </p>
          <p
            className={`text-sm mt-2 leading-tight ${getRequirementStyle(
              checkUppercase(passwordValue),
              passwordValue
            )}`}
          >
            Uppercase and lowercase letters
          </p>
          <p
            className={`text-sm mt-2 leading-tight ${getRequirementStyle(
              checkDigit(passwordValue),
              passwordValue
            )}`}
          >
            At least one digit
          </p>
        </div>

        <button
          type="submit"
          id="submit-btn"
          className="w-full p-3 bg-gradient-to-r from-[#4A90E2] to-[#5CA9F2] text-white font-semibold rounded-full shadow-md hover:opacity-90 transition"
        >
          Sign up
        </button>

        <p className="text-green-500 mt-8 flex justify-center min-h-6">
          {isSubmitted ? "Form submitted successfully!" : ""}
        </p>
      </form>
    </div>
  );
}
