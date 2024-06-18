import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  provider: Bun.env.DATABASE_PROVIDER || 'postgres',
  host: Bun.env.DATABASE_HOST || 'localhost',
  port: Bun.env.DATABASE_PORT || 5432,
  user: Bun.env.DATABASE_USER || 'postgres',
  password: Bun.env.DATABASE_PASSWORD || 'postgres',
  name: Bun.env.DATABASE_NAME || 'checker',
  url: Bun.env.DATABASE_URL || '',
}))
