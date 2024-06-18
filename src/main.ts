import { AppModule } from '@/app/app.module'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify'
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  await app.listen(port)
}
bootstrap()
