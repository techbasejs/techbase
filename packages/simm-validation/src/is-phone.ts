export const validatePhone = (
  phone: string,
): { isValid: boolean; errorMessage?: string } => {
  const phoneNumber = phone.replace(/\D/g, "");
  const phoneRegex = /^0(\d){9,10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return {
      isValid: false,
      errorMessage:
        "Phone Error: Phone number must start with 0 and be 10 or 11 digits long",
    };
  }
  return {
    isValid: true,
  };
};
