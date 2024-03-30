export interface IMailSenderService {
    sendEmail(to: string, subject: string, text: string): Promise<void>;
}
