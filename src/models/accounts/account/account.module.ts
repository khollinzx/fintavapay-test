import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JsonResponseModule } from "../../../utils/jsonResponse.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountRepository } from "./account.repository";
import { Account } from "./account.entity";
import { UtilsModule } from "../../../utils/utils.module";
import { UtilsService } from "../../../utils/utils.service";

@Module({
  controllers: [AccountController],
  imports: [
    UtilsModule,
    JsonResponseModule,
    TypeOrmModule.forFeature([Account])],
  exports: [AccountRepository, UtilsService, AccountService],
  providers: [AccountService, AccountRepository, UtilsService],
})
export class AccountModule {}
