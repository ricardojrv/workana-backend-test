import { User } from './authModel';
import { AppDataSource } from '../../db/dataSource';
import { BadRequestError, UnauthorizedError } from '../../library/error/apiErrors';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from '../../library/jwt/jwt';

const userRepository = AppDataSource.getRepository(User);

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

  const isStrongPassword = validator.isStrongPassword(password, {
    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
  });
  if (!isStrongPassword) {
    throw new BadRequestError('Password does not meet strength requirements.');
  }

  const dbUser = await userRepository.findOneBy({ email });
  if (dbUser) {
    throw new BadRequestError('User already exists.');
  }

  const userObj = await createUser(email, password)

  const user = userRepository.create(userObj)

  await userRepository.save(user);

  return true;
};

const login = async (email:string, password:string) => {
if (!validator.isEmail(email) || !password) {
    throw new BadRequestError('Invalid email or password');
  }

  const user = await userRepository.findOneBy({ email });
  if (!user) {
    throw new UnauthorizedError('Authentication failed');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new UnauthorizedError('Authentication failed');
  }

  const token = jwt.generateToken({ userId: user.Id });


  return { token };
};

const logout = async () => {
  // Logout logic, like clearing tokens or session data, would go here
  return true;
};

export default{ signIn, login, logout };
