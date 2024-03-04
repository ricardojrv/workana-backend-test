import validatePasswordStrength from './validatePassword';

describe('validatePasswordStrength', () => {
  it('should return null for a strong password', () => {
    const password = 'ValidPassword1!';
    expect(validatePasswordStrength(password)).toBeNull();
  });

  it('should report a password being too short', () => {
    const password = 'Short1!';
    expect(validatePasswordStrength(password)).toMatch('be at least 8 characters long');
  });

  it('should report a password missing lowercase letters', () => {
    const password = 'NOLOWERCASE1!';
    expect(validatePasswordStrength(password)).toMatch('include lowercase letters');
  });

  it('should report a password missing uppercase letters', () => {
    const password = 'nouppercase1!';
    expect(validatePasswordStrength(password)).toMatch('include uppercase letters');
  });

  it('should report a password missing numbers', () => {
    const password = 'NoNumbers!';
    expect(validatePasswordStrength(password)).toMatch('include numbers');
  });

  it('should report a password missing symbols', () => {
    const password = 'NoSymbols1';
    expect(validatePasswordStrength(password)).toMatch('include symbols');
  });
});
