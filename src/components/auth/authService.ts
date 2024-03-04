import prisma from '../../db/prisma';
import { BadRequestError, UnauthorizedError } from '../../library/error/apiErrors';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from '../../library/jwt/jwt';
import validatePasswordStrength from '../../library/helpers/validatePassword';
import { Request } from 'express';
import parseBigInt from '../../library/helpers/parseJsonWithBigInt';


const createUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return { email, password: hashedPassword };
  } catch (error) {
    throw new Error('Error hashing the: ' + error.message);
  }
};

const signIn = async (email: string, password: string): Promise<boolean> => {
  if (!validator.isEmail(email)) {
    throw new BadRequestError('Invalid email format.');
  }

  const passwordErrorMessage = validatePasswordStrength(password);
  if (passwordErrorMessage) {
    throw new BadRequestError(passwordErrorMessage);
  }

  const unique = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (unique) throw new BadRequestError('User already exists');

  const userObj = await createUser(email, password);

  await prisma.user.create({ data: { email: userObj.email, password: userObj.password } });

  return true;
};

const login = async (email: string, password: string): Promise<{
  token: string;
}> => {
  if (!validator.isEmail(email) || !password) {
    throw new BadRequestError('Invalid email or password');
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new UnauthorizedError('Authentication failed, Wrong Password or Email');
  }

  const parsedUser = parseBigInt(user);

  const passwordMatch = await bcrypt.compare(password, parsedUser.password);
  if (!passwordMatch) {
    throw new UnauthorizedError('Authentication failed');
  }

  const token = jwt.generateToken({ userId: (parsedUser.id) });


  return { token };
};

const logout = async ({ userId, token, tokenExp }: Partial<Request>) => {
  await jwt.blacklistToken(userId, token, tokenExp);

  return true;
};

export default { signIn, login, logout };
