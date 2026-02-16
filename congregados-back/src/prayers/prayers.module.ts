import { Module } from '@nestjs/common';
import { PrayersService } from './prayers.service';
import { PrayersController } from './prayers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Prayer } from './entities/prayer.entity';

@Module({
  controllers: [PrayersController],
  providers: [PrayersService],
  imports: [TypeOrmModule.forFeature([Prayer])],
})
export class PrayersModule {}
