import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PrayerType } from '../interfaces/PrayerType';

@Entity()
export class Prayer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PrayerType,
    default: PrayerType.THANKSGIVING,
  })
  type: PrayerType;

  @Column('text')
  content: string;

  @Column({ name: 'name_requester', default: 'anonymous' })
  requester: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
