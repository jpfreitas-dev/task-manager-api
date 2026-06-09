import { env } from '@/env';
import type { SignOptions } from 'jsonwebtoken'; // signoption é a tipagem das opções do jwt, util para definir o tempo de expiração do token, por exemplo

type AuthConfig = {
  jwt: {
    secret: string;
    expiresIn: NonNullable<SignOptions['expiresIn']>;
  };
};

export const authConfig: AuthConfig = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1d',
  },
};
