import jwt from 'jsonwebtoken';
import { decript, encriptId } from './CryptoUtils';
require('dotenv-safe').config();

export function createToken(userId: number): string {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {user_id: encriptId(userId)}
    },
    process.env.SECRET || '0zp6RgqDa1pU14BOCwhvTiA6G59bVi'
  );

  return token;
}

export function verifyToken(token: string) {
  let result: number;

  try {
    let decoded = jwt.verify(
      token, process.env.SECRET || '0zp6RgqDa1pU14BOCwhvTiA6G59bVi'
    );

    // @ts-ignore
    const { data } = decoded;

    result = Number(decript(data.user_id).toString())
  }
  catch (error) {
    if(error.toString().includes('TokenExpiredError')) {
      result = -2;
    }
    else if(error.toString().includes('JsonWebTokenError')) {
      result = -1;
    }
    else {
      result = 0;
    }
  }

  return result;
}