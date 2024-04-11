import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinChatPayloadDto {
    @IsNumber()
    @IsNotEmpty()
    chatId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
