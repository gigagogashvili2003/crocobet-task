import { Session } from '@app/sessions/lib/entities'
import { User } from '@app/users/lib/entities'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getDatabaseConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_NAME'),
        // entities: ['dist/**/*.entity.js'],
        entities: [Session, User],
        synchronize: true,
    }
}
