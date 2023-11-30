import { Repository } from 'typeorm';
import { Transaction } from "./transaction.entity";

export class AccountRepository extends Repository<Transaction> {}
