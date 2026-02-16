import { IsOptional, IsString, IsIn, MinLength, MaxLength } from 'class-validator';
import { PrayerType } from '../interfaces/PrayerType';

export class CreatePrayerDto {
  @IsIn([...Object.values(PrayerType)])
  readonly type: PrayerType;

  @IsString()
  @MinLength(5, { message: 'La oración debe tener al menos 5 caracteres' })
  @MaxLength(500, { message: 'La oración no puede exceder 500 caracteres' })
  readonly content: string;

  @IsString()
  @IsOptional()
  readonly requester?: string;
}
