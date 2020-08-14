import { Injectable } from '@nestjs/common';
import * as redis from 'promise-redis';
import { v4 } from 'uuid';
import { EchoMessageDto } from './dtos/echo-message.dto';
const SET_NAME = 'messages';
const MAX_SEND_MESAAGES_TRIES = 3;

@Injectable()
export class MessagesService {
  /**
   *
   */
  client: any;

  constructor() {
    console.log('MessagesService -> constructor -> redis', redis);
    this.client = redis().createClient();

    this.client.on('error', (error) => {
      console.error(error);
    });

    this.client.on('ready', () => {
    });
  }

  async echoAtTime(payload: EchoMessageDto): Promise<string> {
    const uniqeMessage = `${v4()}_${payload.message}`;
    const addMessageArgs = [SET_NAME, new Date(payload.UTCdate).getTime(), uniqeMessage];

    return this.client
      .zadd(addMessageArgs)
      .then((result) => 'success')
      .catch((err) => err);
  }

  async sendMessages(triesCounter = 0) {
    if (this.client.connected) {
      const now = new Date().getTime();
      const getMessagesArgs = [SET_NAME, '0', now];

      // use watch to make sure 2 server not taking the same messages
      return this.client.watch(SET_NAME).then(async () => {
        // multi transaaction to get and delete the messages
        const multi = await this.client.multi();
        multi.zrangebyscore(getMessagesArgs);
        multi.zremrangebyscore(getMessagesArgs);
        multi
          .exec()
          .then((multiResults) => {
            // if the set was changed by another server multiResults will be null and the transaction will be aborted. try again(max 3 times).
            if (multiResults === null) {
              return triesCounter < MAX_SEND_MESAAGES_TRIES ? this.sendMessages(++triesCounter) : Promise.resolve();
            }
            const messages = multiResults[0];
            if (messages.length) {
              messages.forEach(async (message) => {
                this.formatAndSendMessage(message);
              });
            }
          })
          .catch((err) => {
            console.log('Error has occured while trying to get messages: ', err);
          });
      });
    }
  }

  private formatAndSendMessage(message: string) {
    console.log(message.substring(message.indexOf('_') + 1, message.length));
  }
}
