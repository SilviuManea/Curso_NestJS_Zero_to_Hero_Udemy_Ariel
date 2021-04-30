import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username']) //Second Method - assuring unique columns in the database. If another user is created with the same name an 500 error will be thrown
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt); //we hash the provided password and return true or false depending if the hash matches
    return hash === this.password;
  }
}
