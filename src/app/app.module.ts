// import { validate } from '@/config/validation'
import appConfig from '@/config/configurations/app.config'
import databaseConfig from '@/config/configurations/database.config'
import schema from '@/config/validation/schema'
import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../database/prisma.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      // isGlobal: true,
      // validate,
      load: [appConfig, databaseConfig],
      // cache: true,
      validationSchema: schema,
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
