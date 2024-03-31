import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { Content, SendEmailRequest } from 'aws-sdk/clients/ses';
import { IMailSenderService } from '../interfaces';
import { FailedSendingEmailException } from '@app/common/lib/exceptions';

@Injectable()
export class MailSenderService implements IMailSenderService {
    private SES: AWS.SES;

    public constructor(private readonly configService: ConfigService) {
        this.SES = new AWS.SES({
            accessKeyId: this.configService.get<string>('SES_ACCESS_KEY'),
            secretAccessKey: this.configService.get<string>('SES_SECRET_KEY'),
            region: this.configService.get<string>('AWS_REGION'),
        });
    }

    public async sendEmail(to: string, subject: string, text: string): Promise<void> {
        const subjectContent: Content = {
            Data: subject,
        };

        const textContent: Content = {
            Data: text,
        };

        const reqParams: SendEmailRequest = {
            Source: this.configService.get<string>('SES_EMAIL_ADDRESS'),
            Destination: {
                ToAddresses: [to],
            },
            Message: { Subject: subjectContent, Body: { Text: textContent } },
        };

        try {
            await this.SES.sendEmail(reqParams).promise();
        } catch (err) {
            throw new FailedSendingEmailException();
        }
    }
}
