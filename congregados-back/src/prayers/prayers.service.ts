import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrayerDto } from './dto/create-prayer.dto';
import { UpdatePrayerDto } from './dto/update-prayer.dto';

import { Prayer } from './entities/prayer.entity';

@Injectable()
export class PrayersService {
  private readonly logger = new Logger(PrayersService.name);

  constructor(
    @InjectRepository(Prayer)
    private readonly prayerRepository: Repository<Prayer>,
  ) {}

  async create(createPrayerDto: CreatePrayerDto) {
    try {
      const prayer = this.prayerRepository.create(createPrayerDto);
      await this.prayerRepository.save(prayer);
      return prayer;
    } catch (error) {
      this.logger.error('Error creating prayer:', error);
    }
  }

  findAll() {
    return this.prayerRepository.find();
  }

  async findOne(id: number) {
    const prayer = await this.prayerRepository.findOneBy({ id });
    if (!prayer) {
      throw new NotFoundException(`Prayer with ID ${id} not found`);
    }

    return prayer;
  }

  async update(id: number, updatePrayerDto: UpdatePrayerDto) {
    try {
      const prayer = await this.prayerRepository.preload({
        id,
        ...updatePrayerDto,
      });
      if (!prayer) {
        throw new NotFoundException(`Prayer with ID ${id} not found`);
      }
      return this.prayerRepository.save(prayer);
    } catch (error) {
      this.logger.error(`Error updating prayer with ID ${id}:`, error);
    }
  }

  async remove(id: number) {
    const prayer = await this.findOne(id);
    await this.prayerRepository.remove(prayer);
    return { message: `Prayer with ID ${id} removed successfully` };
  }
}
