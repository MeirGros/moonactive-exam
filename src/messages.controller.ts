import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { EchoMessageDto } from './dtos/echo-message.dto';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('echoAtTime')
  echoAtTime(@Body() data: EchoMessageDto): Promise<string> {
    return this.messagesService.echoAtTime(data);
  }
}
