import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['build/', 'node_modules/'],
  },

  // Aplica as regras recomendadas do ESLint para JavaScript
  eslint.configs.recommended,

  // Aplica as regras recomendadas do ESLint para TypeScript
  ...tseslint.configs.recommended,

  // Configuração específica para os arquivos TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error', // Regra de segurança para garantir o uso correto de Promises (ex: chamadas do Prisma)

      '@typescript-eslint/no-explicit-any': 'error', // Força boas práticas proibindo o uso de 'any' para não quebrar o propósito do TS

      'no-console': 'warn', // Emite um aviso para evitar console.logs esquecidos em produção
    },
  },

  // Aplica o desativador de conflitos do Prettier
  eslintConfigPrettier,
);
