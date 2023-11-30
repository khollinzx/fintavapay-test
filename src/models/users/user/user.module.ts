import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JsonResponseModule } from "../../../utils/jsonResponse.module";
import { User } from "./user.entity";
import { AccountModule } from "../../accounts/account/account.module";
import { AccountService } from "../../accounts/account/account.service";
import { UtilsModule } from "../../../utils/utils.module";
import { UtilsService } from "../../../utils/utils.service";
import { AccountRepository } from "../../accounts/account/account.repository";

@Module({
  controllers: [UserController],
  imports: [
    AccountModule,
    UtilsModule,
    JsonResponseModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UserService,
    UserRepository,
    AccountRepository,
    AccountService,
    UtilsService,
  ],
  exports: [UserRepository, AccountRepository, AccountService],
})
export class UserModule {}
