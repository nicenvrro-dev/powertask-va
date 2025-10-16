export const calculatePasswordStrength = (pwd: string) => {
  if (!pwd) return { strength: 0, label: "", color: "" };

  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (pwd.length >= 12) strength++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
  if (/\d/.test(pwd)) strength++;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

  if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
  if (strength <= 3) return { strength, label: "Fair", color: "bg-orange-500" };
  if (strength === 4)
    return { strength, label: "Good", color: "bg-yellow-500" };
  return { strength, label: "Strong", color: "bg-green-500" };
};
