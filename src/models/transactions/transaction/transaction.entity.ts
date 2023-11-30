import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../implementations/abstracts/base.entity';
import { User } from '../../users/user/user.entity';

@Entity('transactions')
export class Transaction extends BaseEntity {
  @Column()
  reference: string;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  balance_before: number;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
