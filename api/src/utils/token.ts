import jwt from 'jsonwebtoken';

interface TokenPayloadIncomplete {
    id: number;
    email: string;
}

interface TokenPayloadComplete {
  id: number
  email: string
  iat: number
  exp: number
}

export function generateToken(payload: TokenPayloadIncomplete): string {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayloadComplete {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayloadComplete;
    return decoded;
}