import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/Database.module';

@Module({
	imports: [DatabaseModule, UsersModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
