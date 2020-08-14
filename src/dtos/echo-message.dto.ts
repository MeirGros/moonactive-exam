import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class EchoMessageDto {
  @IsDateString()
  UTCdate: Date;

  @IsString()
  @IsNotEmpty()
  message: string;
}
