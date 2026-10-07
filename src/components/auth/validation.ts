export function passwordRules(password: string) {
  return [password.length >= 8, /[A-Z]/.test(password) && /[a-z]/.test(password), /[0-9]|[^a-zA-Z0-9\s]/.test(password)];
}
export function activationErrors(employeeId: string, email: string) {
  return { employeeId: employeeId.trim() ? "" : "Employee ID not found.", email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "" : "Incorrect Email" };
}
