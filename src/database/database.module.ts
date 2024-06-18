import databaseConfig from '@/config/configurations/database.config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
  imports: [ConfigModule.forFeature(databaseConfig)],
})
export class DatabaseModule {}
