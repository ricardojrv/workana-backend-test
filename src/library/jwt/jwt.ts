import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../error/apiErrors";
import Redis from "../../db/redis";
import { promisify } from "util";

const SECRET = process.env.SECRET;

const verifyAsync = promisify(jwt.verify.bind(jwt));

const decodeJwtAsync = async (token: string): Promise<any> => {
  try {
    const decoded: JwtPayload = await verifyAsync(token, process.env.SECRET);

    return decoded;
  } catch (error) {
    throw new UnauthorizedError(error.message);
  }
};

const generateToken = ({ userId }: JwtPayload): string => {
  const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1d' });
  return token
}

const blacklistToken = async (userId: string, token: string) => {
  try {
    const data = await Redis.get(userId)

    if (data !== null) {
      const parsedData = JSON.parse(data);
      parsedData[userId].push(token);

      await Redis.setEx(userId, 3600, JSON.stringify(parsedData));
    } else {
      const blacklistData = {
        [userId]: [token],
      };
      await Redis.setEx(userId, 3600, JSON.stringify(blacklistData));
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default { decodeJwtAsync, generateToken, blacklistToken };