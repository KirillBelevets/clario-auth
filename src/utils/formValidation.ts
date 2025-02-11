export const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const checkMinLength = (password: string) => password.length >= 8;
export const checkUppercase = (password: string) => /[A-Z]/.test(password);
export const checkDigit = (password: string) => /[0-9]/.test(password);

export const isValidPassword = (password: string) =>
  checkMinLength(password) && checkUppercase(password) && checkDigit(password);


