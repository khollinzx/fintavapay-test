import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../implementations/abstracts/base.entity';
import { User } from '../../users/user/user.entity';

@Entity('accounts')
export class Account extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  account_number: number;

  @Column()
  balance: number;

  // Establishing the inverse side of the one-to-one relationship with User entity
  @OneToOne(() => User, (user) => user.account)
  user: User;
}
