import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {}

    @Get('health')
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        return this.healthCheckService.check([() => this.db.pingCheck('database')]);
    }
}
