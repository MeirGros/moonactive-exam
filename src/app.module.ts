import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SendMessagesJob } from './send-messages.job';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService, SendMessagesJob],
})
export class AppModule {}
