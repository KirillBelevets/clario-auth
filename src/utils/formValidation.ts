export const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const checkMinLength = (password: string) => password.length >= 8;
export const checkUppercase = (password: string) => /[A-Z]/.test(password);
export const checkDigit = (password: string) => /[0-9]/.test(password);

export const isValidPassword = (password: string) =>
  checkMinLength(password) && checkUppercase(password) && checkDigit(password);

export const getInputStyles = (isValid: boolean, hasError: boolean) =>
  `w-full text-black p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
    hasError
      ? "bg-red-100 focus:ring-red-500 border-red-500 text-red-500"
      : isValid
      ? "focus:ring-green-400 border-green-500"
      : "focus:ring-blue-400"
  }`;

export const getRequirementStyle = (condition: boolean, fieldValue: string) => {
  const isEmpty = fieldValue === "";

  return isEmpty
    ? "text-gray-500"
    : condition
    ? "text-green-500"
    : "text-red-500";
};
