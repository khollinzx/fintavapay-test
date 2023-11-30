import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "./account.entity";
import { AccountRepository } from "./account.repository";
import { UtilsService } from "../../../utils/utils.service";

@Injectable()
export class AccountService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(Account) private accountRepository: AccountRepository,
  ) {}

  async createAccount(accountDto: any) {
    return await this.accountRepository.save(accountDto);
  }

  async isAccountNumberUnique(): Promise<number> {
    let isUnique = true;
    let uniqueNumber = 0;

    while (isUnique) {
      const accountNumber = this.utilsService.generateRandomString();
      const isExists = await this.findByAccountNumber(+accountNumber);

      if (!isExists) {
        isUnique = false;
      }
      uniqueNumber = +accountNumber;
    }
    return uniqueNumber;
  }
  async findByAccountNumber(accountNumber: number) {
    return await this.accountRepository.findOneBy({ account_number: accountNumber });
  }
}
