import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { PrayersService } from './prayers.service';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('prayers')
export class PrayersController {
  constructor(private readonly prayersService: PrayersService) {}

  // Limite estricto: 5 oraciones por minuto por IP
  @Post()
  @Throttle({ short: { ttl: 60000, limit: 5 } })
  create(@Body() createPrayerDto: CreatePrayerDto) {
    return this.prayersService.create(createPrayerDto);
  }
}
