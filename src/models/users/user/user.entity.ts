import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../implementations/abstracts/base.entity';
import { Account } from '../../accounts/account/account.entity';
import { Transaction } from '../../transactions/transaction/transaction.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  // Establishing a one-to-one relationship with Account entity
  @OneToOne(() => Account, (account) => account.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  account: Account;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
