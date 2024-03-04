import validator from 'validator';

const validatePasswordStrength = (password: string): string | null => {
  const requirements = [
    { test: (pwd: string) => validator.isLength(pwd, { min: 8 }), message: 'be at least 8 characters long' },
    { test: (pwd: string) => /[a-z]/.test(pwd), message: 'include lowercase letters' },
    { test: (pwd: string) => /[A-Z]/.test(pwd), message: 'include uppercase letters' },
    { test: (pwd: string) => /[0-9]/.test(pwd), message: 'include numbers' },
    { test: (pwd: string) => /[\W_]/.test(pwd), message: 'include symbols' },
  ];

  const failingRequirements = requirements
    .filter(requirement => !requirement.test(password))
    .map(requirement => requirement.message);

  if (failingRequirements.length > 0) {
    return `Password must ${failingRequirements.join(', ')}.`;
  }

  return null;
};

export default validatePasswordStrength;