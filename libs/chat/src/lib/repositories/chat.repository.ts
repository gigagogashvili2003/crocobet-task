import { Injectable } from '@nestjs/common';
import { Chat } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IChatRepository } from '../interfaces';
import { BaseAbstractRepository } from '@app/common';

@Injectable()
export class ChatRepository extends BaseAbstractRepository<Chat> implements IChatRepository {
    public constructor(@InjectRepository(Chat) private readonly ChatRepository: Repository<Chat>) {
        super(ChatRepository);
    }
}
