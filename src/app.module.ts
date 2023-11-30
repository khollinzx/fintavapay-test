import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/app/config.module';
import { UserModule } from './models/users/user/user.module';
import { TransactionModule } from './models/transactions/transaction/transaction.module';
import { TransactionController } from './models/transactions/transaction/transaction.controller';
import { TransactionService } from './models/transactions/transaction/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './config/app/postgres.config';
import { AccountModule } from './models/accounts/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '.env.testing'],
    }),
    AppConfigModule,
    UserModule,
    TransactionModule,
    TypeOrmModule.forRoot(postgresConfig),
    AccountModule,
  ],
  controllers: [AppController, TransactionController],
  providers: [AppService, TransactionService],
})
export class AppModule {}
