import { Cron, Scheduled } from 'nestjs-cron';

import { Injectable } from '@nestjs/common';

import { MessagesService } from './messages.service';

@Injectable()
@Scheduled()
export class SendMessagesJob {
  constructor(private messagesService: MessagesService) {}

  @Cron('* * * * * *')
  async sendMessages() {
    console.log('SendMessagesJob -> sendMessages -> sendMessages')
    this.messagesService.sendMessages();
  }
}
