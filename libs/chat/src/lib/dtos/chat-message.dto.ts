import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChatMessageDto {
    @IsNotEmpty()
    @IsNumber()
    chatId: number;

    @IsString()
    @IsNotEmpty()
    message: string;
}
