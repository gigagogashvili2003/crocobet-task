import { Provider } from '@nestjs/common';
import { CHAT_REPOSITORY, CHAT_SERVICE } from '../constants';
import { ChatService } from '../services';
import { ChatRepository } from '../repositories';

export const chatProvidrs: Provider[] = [
    { provide: CHAT_SERVICE, useClass: ChatService },
    { provide: CHAT_REPOSITORY, useClass: ChatRepository },
];
