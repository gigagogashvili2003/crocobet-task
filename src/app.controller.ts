import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {}

    @ApiResponse({ description: 'Checks if db is health', status: HttpStatus.OK })
    @HttpCode(HttpStatus.OK)
    @Get('health')
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        return this.healthCheckService.check([() => this.db.pingCheck('database')]);
    }
}
