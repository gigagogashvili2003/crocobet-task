import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY } from '../constants';
import { IChat, IChatRepository } from '../interfaces';
import { IUser } from '@app/users/lib/interfaces';

@Injectable()
export class ChatService {
    public constructor(@Inject(CHAT_REPOSITORY) private readonly chatRepository: IChatRepository) {}

    public findOneByUser(user: IUser) {
        return this.chatRepository.findOneByCondition({ where: [{ user1: user }, { user2: user }] });
    }

    public async preloadChat(chatId: number, data: Partial<IChat>) {
        const chat = await this.chatRepository.findOneByCondition({ where: { id: chatId } });

        if (chat) {
            return chat;
        }

        return this.createAndSave({ ...data });
    }

    public updateById(id: number, data: Partial<IChat>) {
        return this.chatRepository.update({ id }, data);
    }

    public findOneById(id: number) {
        return this.chatRepository.findOneById(id);
    }

    public createAndSave(data: Partial<IChat>) {
        const chat = this.chatRepository.create(data);
        return this.chatRepository.save(chat);
    }
}
