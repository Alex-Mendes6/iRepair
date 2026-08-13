import type { User } from '../../generated/client'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DATABASE_URL: string
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }

  namespace Express {
    interface Request {
      user?: Pick<User, 'id' | 'email'>
    }
  }
}

export {}