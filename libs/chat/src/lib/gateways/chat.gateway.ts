import { JwtPayloadInterface, WsExceptionFilter } from '@app/common';
import { UsersService } from '@app/users';
import { USER_SERVICE } from '@app/users/lib/constants';
import { JWT_SERVICE, JwtLibService } from '@app/utils';
import { Inject, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CHAT_SERVICE } from '../constants';
import { ChatService } from '../services';
import { REDIS_SERVICE } from '@app/redis/lib/constants';
import { RedisService } from '@app/redis';
import { JoinChatPayloadDto } from '../dtos';
import { ChatMessageDto } from '../dtos/chat-message.dto';

@UseFilters(WsExceptionFilter)
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
    public constructor(
        @Inject(JWT_SERVICE) private readonly jwtService: JwtLibService,
        private readonly configService: ConfigService,
        @Inject(USER_SERVICE) private readonly userService: UsersService,
        @Inject(CHAT_SERVICE) private readonly chatService: ChatService,
        @Inject(REDIS_SERVICE) private readonly redisService: RedisService,
    ) {}

    @WebSocketServer()
    private server: Server;

    public afterInit(server: Server) {
        this.server = server;

        server.on('connection', async (socket: Socket) => {
            const authorization = socket.handshake.headers.authorization;

            if (!authorization) {
                throw new WsException('Unauthorized');
            }

            try {
                const { sub }: JwtPayloadInterface = await this.jwtService.verifyToken(
                    authorization,
                    this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                );

                const user = await this.userService.findOneById(sub);

                if (!user) {
                    throw new WsException('User not found');
                }

                await this.redisService.set(`socket_${user.id}`, socket.id);
                socket['user'] = user;
            } catch (err) {
                socket.emit('error', err.message);
            }
        });

        server.on('error', async (error: Error) => {
            console.log(error);
        });
    }

    @SubscribeMessage('join_chat')
    @UsePipes(new ValidationPipe({ transform: true }))
    public async handleJoinChat(socket: Socket, payload: JoinChatPayloadDto) {
        try {
            const user = socket['user'];

            const user2Exists = await this.userService.findOneById(payload.userId);

            if (!user2Exists) {
                throw new WsException('User not found!');
            }

            const chat = await this.chatService.preloadChat(payload.chatId, { user1: user, user2: user2Exists });

            socket.join(`chat_${chat.id}`);

            console.log(socket.rooms);
        } catch (err) {
            socket.emit('error', err.message);
        }
    }

    @SubscribeMessage('message')
    @UsePipes(new ValidationPipe({ transform: true }))
    public async handleMessage(@MessageBody() message: ChatMessageDto, @ConnectedSocket() socket: Socket) {
        try {
            const chat = await this.chatService.findOneById(message.chatId);

            if (!chat) {
                throw new WsException('Chat not found!');
            }

            const room = Array.from(socket.rooms).find((room) => room === `chat_${chat.id}`);

            this.server.to(room).emit('message', message.message);
        } catch (err) {
            socket.emit('error', err.message);
        }
    }
}
