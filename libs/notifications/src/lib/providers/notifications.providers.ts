import { Provider } from '@nestjs/common';
import { MAIL_SENDER_SERVICE } from '../constants';
import { MailSenderService } from '../services';

export const notificationProviders: Array<Provider> = [{ provide: MAIL_SENDER_SERVICE, useClass: MailSenderService }];
